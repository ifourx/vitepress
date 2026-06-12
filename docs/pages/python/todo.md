# TODO

## 虚拟环境

```sh
python -m venv myvenv
source myvenv/bin/activate
# 退出
deactivate
```

## Package Manager

pip不支持完善的项目虚拟环境管理和严格的依赖锁定, 使用uv管理python版本和虚拟环境

```sh
uv venv myvenv2

# 指定python版本
uv venv --python 3.12 venv312

# 安装当前目录下 `pyproject.toml` 文件中的依赖
uv pip install .

# 查看依赖
nv tree
```
