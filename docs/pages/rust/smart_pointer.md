# 智能指针

指针(pointer): 表示包含 `内存地址` 的变量, 这个地址指向内存中的数据. 最常见的指针类型是引用(由 `&` 符号表示, 并借用所指向的值)

智能指针(smart pointer): 具有额外的元数据和功能, 在许多情况下, 智能指针`拥有`所指向的数据(所有权).

智能指针实现了 `Deref` 和 `Drop` 特征.

`Deref` : 允许智能指针结构体的实例像引用一样使用

`Drop` : 允许自定义智能指针实例超出作用域时运行的代码

##

## 智能指针类型

### `Box<T>`

Box 允许你将数据存储在堆上而不是栈上, 留在栈上的是指向堆数据的指针.

`Drop` : 析构函数，不允许显式调用`c.drop()`; 需要提早释放使用 `drop(c)`, 这是预导入 `std::mem::drop` 的函数，可以直接使用

```rs
fn main() {
    let c = CustomSmartPointer { data: String::from("some data") };
    println!("CustomSmartPointer created.");
    c.drop();
    println!("CustomSmartPointer dropped before the end of main.");
}
```

### `Rc<T>`

`Rc<T>` 只能用于单线程场景.

引用计数(reference counting)智能指针通过跟踪所有者的数量,并在没有所有者时清理数据,使数据可以有多个所有者(`允许多个所有权`);

### `Ref<T> ` 和 ` RefMut<T>`

通过 `RefCell<T>` 访问，会在运行时检查借用规则而不是编译时; 只能用于单线程场景

内部可变性: 一个不可变类型暴露出一个用于修改内部值的 API(不可变值得可变借用)

### `Arc<T>`

`Arc<T>` 用于多线程场景.

原子引用计数(Atomic reference counted), `Arc<T>` 具有和 `Rc<T>` 相同的 API

原子性类型工作起来类似原始类型,不过可以安全的在线程间共享.

问题: 为什么 rust 不是所有的原始类型都是原子性? 为什么不是原有标准库中的类型都默认使用`Arc<T>`实现?
答: 原子性虽然线程安全但是有性能惩罚, rust 只在必要时才为此买单. 如果只在单线程中对值进行操作, 原子性提供的保证并无必要, 代码可以因此运行的更快.

## 引用循环问题
