---
outline: deep
---

# 错误处理

rust 只有用于可恢复错误的类型 `Result<T,E>` 和在程序遇到不可恢复错误时停止执行的 `panic!` 宏.

## `Option<T>` 和 `Result<T, E>`

`Option<T>`: 只关心有值或无值的情况, 不关心失败的原因

```rs
let x: Option<i32> = Some(5);
let y: Option<i32> = None;
```

`Result<T, E>`: 用于表示操作成功或失败, 并能携带错误信息

```rs
// unwrap: 遇到错误会 panic
let f1 = File::open("hello.txt").unwrap();

// expect: 和 unwrap 一样,不过可以自定义错误信息, 而不是返回默认的错误信息
let f2 = File::open("hello.txt").expect("Failed to open hello.txt");
```

## 传播错误

### 使用 `?` 简写

`?`操作符遇到错误不会`panic!`,而是将错误值从当前函数返回个调用者处理

```rs

```

## Examples

### 使用 match 匹配不同的错误

```rs
use std::{fs::File, io::ErrorKind};

fn main() {
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            // 错误类型如果是不存在文件, 则新建文件
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => {
                    panic!("Problem creating the file: {:?}", e)
                }
            },
            // 没覆盖所有的 ErrorKind , 用自定义变量来表示除了 `NotFound` 之外的错误
            other_error => panic!("Problem opening the file: {:?}", other_error),
        },
    };
}

```

### 使用 `unwrap_or_else`

老练的 Rustacean 使用 `unwrap_or_else`, 不包含任何 match 表达式且更容易阅读

```rs
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    // unwrap_or_else: 遇到错误时可以自定义处理逻辑, 会执行你传入的闭包(函数), 用它的返回值作为默认值.
    let f = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Problem creating the file: {:?}", error);
            })
        } else {
            panic!("Problem opening the file: {:?}", error);
        }
    });
}

```
