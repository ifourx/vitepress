# 特征

行为集合的抽象(定义方法)

## 为类型实现特征

```rs
pub trait Summary {
    // 默认实现, 可以被重写
    fn default_text(&self) -> String {
        format!("Read more from author: {}...", self.summarize_author())
    }

    fn summarize_author(&self) -> String;
}

pub struct Post {
    pub title: String,
    pub author: String,
    pub content: String,
}

impl Summary for Post {
    fn summarize_author(&self) -> String {
        format!("@{}", self.author)
    }
}

pub struct Weibo {
    pub username: String,
    pub content: String,
}

impl Summary for Weibo {
    fn summarize_author(&self) -> String {
        format!("@{}", self.username)
    }
}
fn main() {}

```

## 参数

使用实现了某个特征的类型作为函数参数

```rs
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.default_text())
}
```

### 约束

## 返回值

函数返回值是实现了某个特征的类型

### 特征对象

## 关联类型

## 基特征(super trait)

## example

```rs
use std::{
    fmt::{Debug, Display},
    iter::Sum,
};

pub trait Summary {
    // 默认实现, 可以被重写
    fn default_text(&self) -> String {
        format!("Read more from author: {}...", self.summarize_author())
    }

    fn summarize_author(&self) -> String;
}

pub struct Post {
    pub title: String,
    pub author: String,
    pub content: String,
}

impl Summary for Post {
    fn summarize_author(&self) -> String {
        format!("@{}", self.author)
    }
}

pub struct Weibo {
    pub username: String,
    pub content: String,
}

impl Summary for Weibo {
    fn summarize_author(&self) -> String {
        format!("@{}", self.username)
    }
}

pub fn notify2<T: Summary>(item: &T) {}
pub fn notify3<T: Summary>(item1: &T, item2: &T) {}
// 多重约束
pub fn notify4<T: Summary + Display>(item: &T) {}
// 函数签名复杂时可以使用where
pub fn notify5<T, U>(t: &T, u: &U) -> i32
where
    T: Display + Summary,
    U: Debug + Clone,
{
    todo!()
}
// 语法糖
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.default_text())
}

fn main() {}

```
