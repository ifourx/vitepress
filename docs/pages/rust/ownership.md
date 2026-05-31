---
outline: deep
---

# 所有权

**所有权(ownership)** 是 Rust 能够在 **不依赖垃圾回收（GC）** 的前提下保证 **内存安全** 的关键机制。

> [!IMPORTANT]
>
> - rust 中每个值在任意时刻都只能有一个所有者
> - 当所有者超出作用域时, rust 会自动调用释放内存函数`drop`(类似其他语言的手动释放内存函数`free`)
> - 值得所有权可以转移(move), 也可以通过借用(borrow)不获取所有权来临时使用

## 移动(move)

rust 隐含的设计: **永远不会自动创建数据的"深层"副本**(但是可以使用 `clone()` 手动深拷贝)

```rust
let s1 = String::from("hello");
let s2 = s1; // move: s1被移动(move)到s2; s1 失效; 并不是拷贝堆上的数据给s2;

// 编译失败: s1 变量失效
println!("{s1}, world!");

// 下面的所有权属于语句本身
String::from("world!") // 没有变量绑定, 语句结束后没有变量持有, 堆内存会被回收
```

`let s1 = String::from("hello");`

s1 变量本身在栈上分配, 由 3 部分组成(ptr,len,cap), 这 3 个元数据存储在栈(stack)上, 而不是堆(heap)上, 但指针所指向的数据可能会是分配在堆上.

- ptr: 一个指向(存储字符串内容的)内存的指针.(当前`String::from("hello")`会被在堆内存上分配)
- len: 当前实际存储的长度.
- cap: 底层分配的最大长度.

`let s2 = s1;`

1. 当把 s1 赋值给 s2 时,数据被复制,此处复制的是栈数据(s1 的 ptr,len,cap),而不是复制 ptr 所指向的堆上的数据.
2. 然后, rust 会使变量 s1 失效(所以这不是浅拷贝,因为 s1 失效),失效也就意味着不需要释放堆上的数据(**已经 move 给 s2 了, 所有权在 s2**).

以上过程被称为`移动(move)`

### copy

实现了 `copy trait`的类型 , 赋值时是值的复制

比如 rust 中的基本类型(Primitive Types: 整型,浮点,字符,布尔)

复合类型(Compound Types: 元组,数组)中的元素如果都是基本类型, 也会实现 `copy trait`

```rust
let s1 = 5;
let s2 = s1; // copy, 而不是move

println!("{s1}"); // 可以正常打印s1, 不会编译错误
```

### clone

集合类型（Collection Types: ` String`,`Vec<T>`,`HashMap<K, V>`,`struct`等）,又称动态复合类型,无法确定大小, 一般分配在堆上(变量本身赋值给另一个变量时的动作会是 `move`;函数调用不传引用也会 `move`)

struct 中的字段类型如果`都是基本类型`, 可以实现 copy 而不 move

```rs
#[derive(Debug, Clone, Copy)] // copy的实现依赖于clone
struct MoveCommand {
    x: i32,
    y: i32,
}

fn main() {
    let mc = MoveCommand { x: 123, y: 123 };

    let mc2 = mc; // copy, 发生值的复制, 和clone的效果一样, 其实就是深拷贝

    println!("mc: {:?}", mc) // 编译通过, mc变量 依然有效
}
```

move
::: code-group

```rs [move1]
#[derive(Debug)] // 没有派生 copy trait
struct MoveCommand {
    x: i32,
    y: i32,
}

fn main() {
    let mc = MoveCommand { x: 123, y: 123 };

    let mc2 = mc; // [!code highlight] move, 因为没有实现 copy trait, 赋值时发生的是 move 操作

    println!("mc: {:?}", mc) // [!code error] 编译失败, move后 mc 失效
}
```

```rs [move2]
#[derive(Debug)] // 没有派生 copy trait
struct MoveCommand {
    x: i32,
    y: i32,
}
fn foo(mc: MoveCommand) {
    println!("x is {}", mc.x)
}

fn main() {
    let ix = MoveCommand { x: 456, y: 456 };

    foo(ix); // [!code highlight] `MoveCommand`没有派生copy trait, 是move, 不是复制

    println!("ix: {:?}", ix) // [!code error] 编译失败, ix被移动到函数, ix变量本身已经失效(foo调用结束,ix被drop)
}
```

:::

struct 中的字段`不全是基本类型`

```rs
#[derive(Debug, Clone)] // 派生clone
struct MoveCommand {
    x: String,
    y: i32,
}

fn main() {
    let mc = MoveCommand {
        x: String::from("hello"),
        y: 123,
    };

    let mc2 = mc.clone(); // [!code highlight] clone

    println!("mc: {:?}", mc) // 编译通过, 因为是clone, 所有权没有转移
}
```

## 作用域和赋值

将一个 **全新的值** 赋给一个 **已存在的变量** 时，Rust 会立即调用 `drop`函数并释放原始值的内存。(将原始值的内存返还给分配器)

```rust
let mut s = String::from("hello");
s = String::from("ahoy");

println!("{s}, world!");
```

## 借用(borrow)

为了避免 move(所有权转移), rust 提供 **借用(borrow)** 机制, 使用 **引用(reference)** 来临时访问一个值(不拥有值得所有权)

> [!IMPORTANT]
>
> - 在同一时间，要么有多个不可变引用 (&T)，要么只能有一个可变引用 (&mut T)。(避免 double free; 避免数据竞争;)

### 引用和解引用

引用（&T, &mut T）本身是简单的指针，大小固定，本质是简单类型，但所引用的数据可能是复杂类型。

访问引用的数据需要先解引用, 但 rust 一般会自动解引用, 解引用使用`*`
::: code-group

```rs [sample1]
fn main() {
    // 创建对动态数组vec的引用
    let v = &vec![10; 40];

    // rust自动解引用, 其实就是 let x = (*v)[3];
    let x = v[3];
    println!("x: {:?}", x)
}
```

```rs [sample2]
fn largest<T>(list: &[T]) -> &T
where
    T: PartialOrd,
{
    // 访问引用类型中的数据需要先解引用, 因为函数返回值类型是 `&T`, 所以我们先解引用,然后取得下标0的元素, 然后再引用.
    let mut max_value = &((*list)[0]);

    // 一般写法, rust自动解引用, list[0]其实是 (*list)[0];
    // 因为返回值类型是&T, 解引用后取得值后需要再使用"&"引用
    let mut max_value2 = &list[0];


    for item in &(*list) {
        if item > max_value {
            max_value = item;
        }
    }
    max_value
}
```

:::

问: 既然引用是简单类型,所以可以多个(&T),但为什么不能多个(&mut T),

答: 因为 rust 就是这么设计的, 用来防止数据竞争. **“在同一时间，要么有多个不可变引用 (&T)，要么只能有一个可变引用 (&mut T)。”**

### 可变引用

重要的限制：如果你有一个指向值的可变引用，那么你不能有其他任何指向该值的引用。

带来的好处: rust 拒绝编译存在数据竞争的代码来避免数据竞争带来的问题

### NLL 非词法生命周期

版本 `Rust 2015 edition` 使用的是`词法作用域驱动`, 生命周期严格绑定变量作用域(持续整个作用域);

版本 `Rust 2018 edition` 之后默认启用的特性: `Non-Lexical Lifetimes（NLL，非词法生命周期）`

作用: 改进了借用检查器, 精细的分析`引用`的实际使用范围(而不是词法块), 生命周期只会持续到`"最后一次使用"`的位置,而不是整个词法作用域

以下代码正常通过编译, 如果没有 NLL, 代码会因为借用冲突无法编译. 有了 NLL, 有效减少了编译报错: "同时存在可变,不可变借用"

::: code-group

```rs [2018 √]
fn main() {
    let mut s = String::from("hello");

    let r1 = &s; // no problem
    let r2 = &s; // no problem

    let r3 = &mut s; // no problem

    println!("{r3}"); // 编译通过
}
```

```rs [2018 ×]
fn main() {
    let mut s = String::from("hello");

    let r1 = &s; // no problem
    let r2 = &s; // no problem
    // 编译失败: 后面需要用到不可变引用r1,r2; 此处又创建了可变引用
    // 编译器不允许同时存在(防止读取数据被修改,避免数据竞争,保证数据一致性)
    let r3 = &mut s; // [!code error]

    println!("{}, {}, and {}", r1, r2, r3);
}
```

:::

## 切片(slice)

切片是一种引用类型，因此它没有所有权。让你引用一个集合或数组中连续的元素序列。
::: code-group

```rs [array]
fn main() {
    // 使用不可变数组创建不可变切片
    let arr = [10; 6];
    let slice = &arr;
    let slice2 = &arr[1..4];

    // 使用可变数组创建可变切片
    // 可变数组: 可变指的是数组内元素可变, 数组长度在编译时固定(不可变),
    // 数组存储在栈内存上
    let mut arr2 = [10; 6];
    let slice_mut1 = &mut arr2;
    slice_mut1[0] = 99;
    println!("{:?}", arr2);
}
```

```rs [vec]
fn main() {
    // 使用动态数组vec(集合类型)创建切片
    let v = vec![10; 6];
    let slice_vec = &v[1..4];
}
```

:::
