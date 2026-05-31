---
outline: deep
---

Rust 很多的并发方案都由 crate 实现. 他们比标准库要发展的更快; 请在网上搜索当前最新的用于多线程场景的 crate.

并发: 在单核 cpu 上通过线程切换实现多个任务的并发执行(任务交替执行).
并行: 在多核 cpu 上多个线程各自占用一个 cpu 同时运行(任务同时进行)

无畏并发: rust 会在编译时报告并发错误, 而不是运行时, 所以无畏的进行并发编程吧

进程: 拥有独立的内存空间,可以包含多个线程,同一进程内的线程共享内存和资源
线程: 操作系统调度的最小单位, 在进程中多个并发运行的独立部分

多线程可能带来的问题:

1. 竞争状态: 多个线程以不一致的顺序访问数据或资源
2. 死锁: 线程间互相等待对方停止使用其所拥有的资源

使用 move 在新线程中获取所有权:
使用闭包从新线程获取主线程数据,但 rust 不知道新线程会执行多久,无法知晓对主线程数据的引用是否一直有效,所以使用 move 强制闭包获取主线程数据的所有权

## 消息传递

设计思想来源于 golang: 不要通过共享内存来通讯,而是通过通讯来共享内存

通道(channel):

1. 发送者(transmitter)和接收者(receiver)
   mpsc(multiple producer,single consumer): 多个生产者,单个消费者
2. 一旦将一个值传送到通道中，将无法再使用这个值

examples:

```rs
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    // 通过clone发送者来创建多个生产者
    let tx1 = tx.clone();

    thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];

        for val in vals {
            // send 函数获取参数 val 的所有权并移动这个值归接收者所有
            // 有效防止在发送后再次意外地使用 val
            tx1.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    thread::spawn(move || {
        let vals = vec![
            String::from("more"),
            String::from("messages"),
            String::from("for"),
            String::from("you"),
        ];

        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    // // recv 会阻塞主线程,直到接收到值;
    // // try_revc 立刻返回结果: 可以使用循环一直调用直到接收到值
    // let received = rx.recv().unwrap();
    // println!("Got: {}", received)

    for received in rx {
        println!("Got: {received}")
    }
}

```

## 共享状态

智能指针使得多所有权成为可能,然而这会增加额外的复杂性,因为需要以某种方式管理这些不同的所有者

### `互斥器(mutex)`

通过`锁(lock)` 系统保护数据, 在任意时刻, 只允许一个线程访问某些数据

获取锁-处理数据-释放锁(drop)

lock 调用会阻塞当前线程, 直到我们拥有锁为止(其他线程可能正在操作锁)

```rs
use std::{
    sync::{Arc, Mutex},
    thread,
};

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            // lock 调用返回 `MutexGuard` 智能指针, 实现了 `Deref` 和 `Drop`, 所以离开作用域时会自动丢弃(释放)锁
            let mut num = counter.lock().unwrap();
            *num += 1;
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}
```
