---
outline: deep
---

## 泛型(Generic Data Types)

### 在函数定义中使用泛型

- `<T>`: 使用尖括号声明, 表明 T 是泛型类型, 需要使用尖括号先声明, 你不先声明, rust 都不知道 T 是什么东西
- `list: &[T]`: 表示形参 list 的类型为 `&[T]`, 也就是调用函数时接收的实参需要是一个切片,切片中的元素类型是`T`
- `&T`: 函数返回一个对类型为`T`的引用

```rs
// list是切片(slice)的引用, 不是数组, 数组使用 `list: &[T; N]`
fn largest<T>(list: &[T]) -> &T
where
    T: PartialOrd,
{
    let mut max_value = &list[0];

    for item in list {
        if item > max_value {
            max_value = item;
        }
    }
    max_value
}
```

### 在方法定义中使用泛型

```rs
#[derive(Debug)]
struct Point<G1, G2> {
    x: G1,
    y: G2,
}

impl<X1, X2> Point<X1, X2> {
    fn get_x(&self) -> &X1 {
        // &((*self).x)
        &self.x
    }

    fn mixup<T1, T2>(self, other: Point<T1, T2>) -> Point<X1, T2> {
        Point {
            x: self.x,  // move
            y: other.y, // move
        }
    }
}

// 为具体的泛型类型实现方法
impl Point<i32, i32> {
    fn distance_from_origin(&self) -> i32 {
        self.x + self.y
    }
}

fn main() {
    let p1 = Point { x: "hello", y: 123 };

    println!("p.x : {}", p1.get_x());

    let p2 = Point { x: 456, y: "wrold" };

    println!("p2.x : {}", p2.get_x());
    println!("p2.y : {}", p2.y);

    let p3 = p1.mixup(p2);
    // println!("p2.y : {}", p2.y);

    println!("p3: {:?}", p3)
}

```

### 泛型的性能

rust 编译时会进行泛型代码**单态化**, 将泛型代码转化为具体类型的特定代码来保证效率

## 特征
