---
outline: deep
---

# 生命周期

> [!important]
> 生命周期标注并不会改变任何引用的实际作用域

生命周期的使用只是告诉编译器: 引用的使用要在被引用的值没有被 drop 前完成(生命周期只是保证你不会在值被销毁后还用它的引用)

生命周期属于静态分析工具(只有静态检查时会使用到生命周期), 不会有运行时消耗(编译后没有生命周期概念), 因为生命周期的使用, 运行时就不会出现访问了无效引用的错误, 从而实现**不引入运行时开销的前提下, 实现了内存安全**

```rs
&i32 // 一个引用
&'a i32 // 具有显式生命周期的引用
&'a mut i32 // 具有显式生命周期的可变引用
```

## 生命周期的省略规则

函数或者方法中, 参数的生命周期被称为**输入生命周期**, 返回值的生命周期被称为**输出生命周期**

> [!important]
>
> 1. 每一个引用参数都会获得独立的生命周期
> 2. 若只有一个输入生命周期(参数中只有一个引用类型), 那么该生命周期会被赋予给所有的输出生命周期
> 3. 若存在多个输入生命周期, 且其中一个是`&self`或`&mut self`(方法), 则`&self`的生命周期被赋予给所有的输出生命周期

```rs
// 例子a
fn first_word(s: &str) -> &str {}
// 适用规则 `1` 和 `2` , 编译时静态检查相当于下面这个函数
fn first_word<'a>(s: &'a str) -> &'a str {}

// 例子 b
fn longest(x: &str, y: &str) -> &str {}
// 只适用规则 `1` , 编译时静态检查无法推导函数返回值的生命周期, 编译不通过
fn longest<'a, 'b>(x: &'a str, y: &'b str) -> &str {} // [!code error]
```

## 函数中的生命周期

函数的返回值如果是一个引用类型, 那么它的生命周期只会来源于:

- 函数参数的生命周期
- 函数体中某个新建引用的生命周期(悬垂引用)

```rs
// 如果不是用生命周期, 无法通过编译
// 因为返回值可能是`x`也可能是`y`(存在多个可能, 因此编译器无法自动推导生命周期),但静态检查时需要知道生命周期来确保引用有效,所以需要显式的手动标注生命周期
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// 静态检查时只看签名, 不看函数内部实现, 签名中有多个引用时,需要使用生命周期(虽然返回值是同一个引用, 但编译器不看内部实现)
fn longest2<'a>(x: &'a str, y: &str) -> &'a str {
    x
}

// 自动推导生命周期, 适用了规则 `1` 和 `2`
fn longest3(x: &str) -> &str {
    x
}
```

### 悬垂引用

```rs
// 悬垂引用
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    let result = String::from("result value");
    result.as_str() // result是函数内部新建的变量, 作用域只在函数体内
} // result 在函数结束后就会被drop, 但对result的引用依然在继续
```

最好的办法就是不使用引用, 而是直接返回内部字符串, **rust 会将内部字符串所有权转移给调用者**

```rs
fn longest(_x: &str, _y: &str) -> String {
    String::from("really long string")
}
```

## 结构体中的生命周期

```rs
struct ImportantExcerpt<'a> {
    part: &'a str,
}

```

## 方法中的生命周期

```rs
impl<'a> ImportantExcerpt<'a> {
    // 方法签名中往往不需要标注生命周期, 因为适用了规则 `1` 和 `3`
    fn welcome(&self, content: &str) -> &str {
        println!("welcome: {}", content);
        self.part
    }

    // 适用规则 `1` 和 `3` 后相当于下面这个
    // 返回值的生命周期和self一致, 表示只要结构体示例(self)在生命周期内, 那方法返回值也在生命周期内(有效)
    fn welcome_lifetime<'b>(&'a self, content: &'b str) -> &'a str {
        println!("welcome: {}", content);
        self.part // 生命周期是self的生命周期a, 方法签名中返回值默认也是self的生命周期, 所以不需要使用约束条件where
    }

    // 返回值的生命周期使用非self参数的生命周期, 必须手动标注, 省略的话编译器会推导为和self实例一致的生命周期(参考规则 `3`)
    fn welcome2<'b>(&'a self, content: &'b str) -> &'b str {
        println!("welcome: {}", content);
        content // 生命周期是b, 方法签名中返回值默认也是生命周期b, 所以不需要使用约束条件where
    }
}
```

## 生命周期的约束

当方法签名的返回值的生命周期 和 方法内部返回值的生命周期不一致时需要进行约束, 因为编译器无法推导他们之间的关系

- `'a: 'c` 表示声明生命周期 a, a 的约束条件是: a 的周期大于等于生命周期 c **「 a 比 c 活得久, c 比 a 死的早 」**
- `'b` 表示声明生命周期 b
- `'c` 表示声明生命周期 c

```rs
impl<'a: 'c, 'b, 'c> ImportantExcerpt<'a> {
    fn announce_and_return_part2(&'a self, announcement: &'b str) -> &'c str {
        println!("Attention please: {}", announcement);
        self.part
    }
}
```

上面的写法相当于下面这个 `where` 的写法

```rs
// 手动标注返回值的生命周期: 不使用默认的self的生命周期, 适用自定义生命周期标注
impl<'a> ImportantExcerpt<'a> {
    fn announce_and_return_part<'b, 'c>(&'a self, announcement: &'b str) -> &'c str
    where
        // 使用生命周期约束, 因为方法体内的返回值生命周期是self的生命周期a, 而方法签名中的生命周期是手动标注的c,
        'a: 'c, // 表示生命周期`a` 大于等于 生命周期 `c`(生命周期c不会超过生命周期a)
    {
        println!("Attention please: {}", announcement);
        self.part // 此处返回值的生命周期是a, 方法签名中返回值的生命周期是c; 因为定义了生命周期关系`'a: 'c`, 表示生命周期c在生命周期a内, 所以永远不会返回悬垂引用
    }
}
```

## 静态生命周期

`'static` : 受影响的引用可以在整个程序的生命周期内存在

```rust
let s: &'static str = "I have a static lifetime.";
```

所有字符串字面量的生命周期默认是 `'static` 存在于整个程序的生命周期内

## examples

```rs
use std::fmt::Display;

fn longest_with_an_announcement<'a, T>(x: &'a str, y: &'a str, ann: T) -> &'a str
where
    T: Display,
{
    println!("Announcement! {}", ann);
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let l = longest_with_an_announcement("4", "19", "hello world");
    println!("longest: {}", l)
}

```

函数中使用生命周期的各种写法

```rs
// 需要添加约束 'a: 'c 和 'b: 'c  因为函数返回的x或y的生命周期和签名中返回的生命周期c不一致, 编译器需要知道c和a或b之间的约束
fn longest2<'a: 'c, 'b: 'c, 'c>(x: &'a str, y: &'b str) -> &'c str {
    if x.len() > y.len() { x } else { y }
}

// 下面这个函数实现了相同的效果, 签名中使用了一致的生命周期(所以不需要约束)
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
```
