---
outline: deep
---

## 枚举类型(enum)

某个变量是几种类型中的一种

### `Option<T>`

枚举类型`Option<T>`包含 2 个成员: `Some(T)` 和 `None`;

```rs
enum Option<T> {
    Some(T),
    None,
}
```

都被包含在`prelude`中, 使用时不需要提前导入;

```rs
let some_number = Some(5);
let some_string = Some("a string");

// 编译器无法通过`None`值推断出`Some`成员保存的值的类型
// 需要显式指定类型, 如 `Option<i32>`;
// 此处表示: `absent_number`变量类型是 `Option<i32>` 但目前并没有一个有效值
let absent_number: Option<i32> = None;
```

`Option<T>` 和 `T` 属于不同类型, 所以下面代码不能通过编译器

```rs
let x: i8 = 5;
let y: Option<i8> = Some(5);

let sum = x + y; // [!code error] 无法通过编译
```

### `Result<T, E>`

```rs
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

### examples

```rs
pub mod mjdemo {
    // 枚举嵌套结构体
    #[derive(Debug)]
    pub struct MoveCommand {
        x: i32,
        y: i32,
    }
    #[derive(Debug)]
    pub struct WriteCommand {
        message: String,
    }
    #[derive(Debug)]
    pub enum Command {
        // 枚举成员Move的数据类型是 `MoveCommand` 结构体
        Move(MoveCommand),
        Write(WriteCommand),
        // 枚举成员ChangeColor的数据类型是元组(i32,i32,i32)
        ChangeColor(i32, i32, i32),
        // 匿名结构体, `Say`是枚举成员名, 数据类型是匿名结构体
        Say { name: String, message: String },
        // 枚举成员Bark的数据类型是`String`
        Bark(String),
        // 没有任何关联数据; 没有字段的结构体(单元结构体)
        Quite1,
        // 匿名结构体
        Quite2 { b: bool },
    }
    impl Command {
        pub fn process_command(&self) {
            match self {
                Command::Move(cv) => {
                    println!("position x:{}, y:{}", cv.x, cv.y)
                }
                Command::Write(cw) => {
                    println!("message: {}", cw.message)
                }
                Command::ChangeColor(x, y, z) => {
                    println!("color: x={}, y={}, z={}", x, y, z)
                }
                Command::Say { name, message } => {
                    println!("my_name: {}, say: {}", name, message)
                }
                Command::Bark(c) => {
                    println!("bark: {}", c)
                }
                Command::Quite2 { b } => {
                    println!("bool: {}", b)
                }
                Command::Quite1 => {
                    // panic!()
                    println!("Quitting.")
                } // _ => (),
            }
        }

        pub fn print_info(&self) {
            println!("{:?}", self)
        }
    }
}
```

## 结构体类型(struct)

### 单元结构体

没有任何命名字段的结构体

```rs
struct QuitMessage;

fn print_quitmsg(_: QuitMessage){
    pirntln!("Quitting.");
}

fn main(){
    let msg = QuitMessage;
    print_quitmsg(msg);
}
```

### 元组结构体

实例化时字段有顺序但字段无命名(不是匿名结构体)

```rs
// 结构体名 `WriteMessage`, 但字段无命名
struct WriteMessage(String); // 元组结构体
struct ChangeColorMessage(i32, i32, i32); // 元组结构体
```

### 普通结构体

```rs
struct MoveMessage {
    x: i32,
    y: i32,
}
```

## examples

struct 嵌套 enum

```rs
// struct 指定字段公有
pub struct Task {
    pub id: u32,
    status: Status,
}
// 和struct不同, 加上pub后, 枚举的字段会全部公有 // [!code highlight]
// 不需要给字段都加上 `pub`
pub enum Status {
    Todo,
    Doing,
    Done,
}

```

enum 嵌套 sruct

```rs

```

构造函数

```rs
pub mod back_of_house {
    pub struct Breakfast {
        pub toast: String,
        seasonal_fruit: String,
    }

    impl Breakfast {
        // 使用关联函数来构造
        pub fn new(toast: &str) -> Self {
            Self {
                toast: String::from(toast),
                seasonal_fruit: String::from("peaches"),
            }
        }
        // `&self`是`self:&Self`的简写 // [!code highlight]
        pub fn say(&self) {
            // 所以内部使用`self`就行 // [!code highlight]
            println!("seasonal fruit is:{}", self.seasonal_fruit)
        }
    }
}

```
