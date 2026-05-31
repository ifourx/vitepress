---
outline: deep
---

Rust 的零开销原则: 你写的高级抽象(如泛型,特征,迭代器,闭包等)在编译后, 不会带来任何额外的运行时开销, 他们的执行效率等同于手写的底层代码

你手写的底层代码也未必比高级抽象更优雅

## 闭包(Closures)

与函数不同,闭包可以捕获其定义范围内的值,然后在其他地方调用闭包

### 闭包类型推断和注解

```rust
fn  add_one_v1   (x: u32) -> u32 { x + 1 }; // 函数
let add_one_v2 = |x: u32| -> u32 { x + 1 }; // 带有类型注解的闭包
let add_one_v3 = |x|             { x + 1 }; // 没有类型注解,编译时rust需要具体的值来推断类型
let add_one_v4 = |x|               x + 1  ; // 同上. 可以省略括号,因为就只有一个表达式
let add_one_v5 = ||                println!("1"); // 没有形参的闭包
```

案例

```rs
let example_closure = |x| x;

let s = example_closure(String::from("hello")); // 编译器推断x类型为 `String`, 锁定在闭包: `example_closure` 中
let n = example_closure(5); // 因为 闭包: `example_closure` 的类型被锁定为 `String`, 所以不能使用 `5` , 不会通过编译

```

### 捕获引用或转移所有权

函数接受参数的三种方式: 不可变借用,可变借用,获取所有权. 闭包同样也有这三种

1. 不可变借用: 变量绑定到闭包定义,通过变量名调用闭包

```rs
fn main() {
    let list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");

    let only_borrows = || println!("From colsure: {list:?}");

    println!("Before calling closure: {list:?}");
    only_borrows();
    println!("After calling closure: {list:?}");
}
```

2. 可变借用

```rs
fn main() {
    let mut list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");

    let mut mutably_borrows = || list.push(7);

    // 取消下行的注释会编译失败, rust设计防止数据竞争
    // println!("Before calling closure: {list:?}");
    mutably_borrows();
    mutably_borrows();

    println!("After calling closure: {list:?}");
}
```

3. 所有权转移: 在参数列表前使用 move 关键字,将闭包传递给新线程获取环境中使用值的所有权

```rs
use std::thread;

fn main() {
    let list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");

    thread::spawn(move || println!("From thread: {list:?}"))
        .join()
        .unwrap();
}
```

## 迭代器

惰性(lazy)求值: 只有当消费时才会执行(强大的性能).

```rs
let v1: Vec<i32> = vec![1, 2, 3];

// 使用collect()消耗迭代器, 将结果值收集到集合数据类型中
// 需要确定类型如Vec或者String(这个编译器无法上下文推导);
// <_>: 确定是vec后,让编译器自已推导vec中的数据类型
let v2: Vec<_> = v1.iter().map(|x| x + 1).collect();

assert_eq!(v2, vec![2, 3, 4]);

```
