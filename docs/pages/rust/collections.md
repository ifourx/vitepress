---
outline: deep
---

# 集合

## `Vec<T>`

动态长度的有序列表

```rust
let mut v = Vec::new();
v.push(1);
v.push(2);
println!("{:?}", v); // 输出 [1, 2]
```

## String

实际是 `Vec<u8>`的封装,专门处理 UTF-8 字符

## `HashMap<K,V>`

哈希映射

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

let team_name = String::from("Blue");
let score = scores.get(&team_name).copied().unwrap_or(0);
```

## `HashSet<T>`

去重集合

```rust
use std::collections::HashSet;
let mut set = HashSet::new();
set.insert("apple");
set.insert("apple");
println!("{}", set.len()); // 1，去重成功
```
