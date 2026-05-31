## match

1. 从上往下依次匹配分支, 一旦匹配到分支就会停止后续匹配并执行该分支代码(之后的分支将不会被检查或执行)
2. 必须穷尽, 使用自定义变量(例如: `other`等 ) 或者 `_` 来匹配所有情况

```rs
#[derive(Debug)]
enum Action {
    Say(String),
    MoveTo(i32, i32),
    ChangeColorRGB(u16, u16, u16),
}

fn main() {
    // 数组中存放枚举类型
    let actions = [
        Action::Say("Hello Rust".to_string()),
        Action::MoveTo(1, 2),
        Action::ChangeColorRGB(255, 255, 0),
    ];
    // 遍历数组
    for action in actions {
        match action {
            Action::Say(s) => {
                println!("Say");
            } // 使用 `_` 或者自定义变量比如`other`来匹配剩余
            other => println!("other: {:?}", other),
        }
    }
}

```

### if let

属于 match 的语法糖

if 的条件类型是 bool 表达式, 而 `if let` 的条件类型是模式匹配结构

匹配一个模式, 忽略剩下的所有模式

```rs
fn main() {
    let v = Some(3u8);

    if let Some(3) = v {
        println!("three");
    }
}
```

### `matches!`

```rs
#[derive(Debug)]
enum MyEnum {
    Foo,
    Bar,
}

fn main() {
    let v = vec![MyEnum::Foo, MyEnum::Bar, MyEnum::Foo];
    // let x = v.iter().filter(|x| **x == MyEnum::Foo);
    let x = v.iter().filter(|x| matches!(x, MyEnum::Foo));

    println!("x: {:?}", x);

    let foo: char = 'f';
    let f: bool = matches!(foo, 'A'..='Z' | 'a'..='z'); // true

    let bar: Option<i32> = Some(4);
    let b: bool = matches!(bar, Some(x) if x > 2); // true
}

```

### `@绑定`

```rs
enum Message {
    Hello { id: i32 },
}

let msg = Message::Hello { id: 5 };

match msg {
    // 创建一个存放值的变量的同时测试其值是否匹配模式。
    // `@` 左侧是绑定的变量名, 右侧是模式匹配
    Message::Hello { id: id_variable @ 3..=7 } => {
        println!("Found an id in range: {}", id_variable)
    },
    Message::Hello { id: 10..=12 } => {
        println!("Found an id in another range")
    },
    Message::Hello { id } => {
        println!("Found some other id: {}", id)
    },
}
```
