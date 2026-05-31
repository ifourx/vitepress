---
outline: deep
---

# Git

## config

```sh
# 全局配置文件 ~/.gitconfig 这个邮箱需要使用到github上你绑定的邮箱
git config --global user.name "[name]"
git config --global user.email "[email address]"

# project级别的配置文件 .git/config
git config user.name "[name]"
git config user.email "[email address]"

# 启用有帮助的彩色命令行输出
git config --global color.ui auto
# 设置commit时使用的编辑器为vim
git config --global core.editor vim
```

###

```sh
# 测试与github通信否成功
ssh -T git@github.com
# 测试别名
ssh -T github
```

## branch

```sh
# 查看本地分支 -r远程 -a所有 -vv当前分支的关联关系
git branch

# 切换分支
git switch "<branch-name>"

# 创建本地分支并切换
# 等价于 git branch <branch-name> && git switch <name>
git switch -c "<branch-name>" [<origin>/<dev>]

# 重命名分支
git branch -m <old-name> <new-name>

# 删除本地分支(未合并会报错), -D强制删除
git branch -d "<branch-name>"

# 删除远程分支dev
git push origin --delete dev

# 将<branch-name>分支下的<dir>目录复制到当前分支
git checkout <branch-name>  -- <dir>
```

## fetch & merge | pull

```sh
# git fetch --all # 下载所有远程主机远端跟踪分支的所有历史（并不会修改工作目录中的内容，从远程更新数据，只会获取数据然后需要自己手动合并）
# 不常用: git fetch origin main:temp 从指定远程(origin)的main分支映射到本地的temp分支(会覆盖)
git fetch origin     # 从远程(origin)更新所有分支信息; 或者使用 git fetch origin main 只更新main分支
git merge origin/main   # 将刚刚fetch的远程main分支merge到当前所在分支,区别于 git merge main

# --no-ff
# 禁止快进模式，对main分支非常友好，建议合并时都加上这个参数
git switch main
git merge --no-ff -m "merge with no-ff" <hotfix>
git branch -d <hotfix>

# git pull 是 git fetch 和 git merge 的结合
# 将远程分支fetch并merge到本地分支
# 推荐使用fetch和merge代替pull
git pull <远程主机名> <远程分支名>:[本地分支名]
git pull origin main:main
```

## tag

```sh
# 列出已有标签
git tag

# 可以创建带有说明的标签，用-a指定标签名，-m指定说明文字
git tag -a v2.0.6 -m "version 2.0.6" <本地分支名>

# 给某次commit打上标签 v1.2
git tag -a v1.2 f8603ca

# 查看打标信息
git show v1.2

# 将标签信息推送到服务器。 git push origin --tags 推送所有不在远程的标签
git push origin <tagname>

# 删除本地标签。
git tag -d <tagname>

# 删除远程仓库的标签
git push origin --delete <tagname>
```

## Commit type

| 类型 (`type`) | 含义                            | 示例                           |
| ------------- | ------------------------------- | ------------------------------ |
| `feat`        | ✨ 新功能                       | `feat: 添加登录模块`           |
| `fix`         | 🐛 修复 bug                     | `fix: 修复表单验证错误`        |
| `docs`        | 📚 文档变更（仅文档，不是代码） | `docs: 补充 README 示例`       |
| `style`       | 💅 格式更改（空格、缩进等）     | `style: 调整代码缩进和空格`    |
| `refactor`    | ♻️ 代码重构（无功能改动）       | `refactor: 重构用户服务逻辑`   |
| `test`        | ✅ 添加或更新测试代码           | `test: 增加接口测试用例`       |
| `chore`       | 🔧 构建流程、脚手架、依赖更新等 | `chore: 升级 eslint 版本`      |
| `perf`        | 🚀 性能优化                     | `perf: 优化分页查询性能`       |
| `ci`          | 🛠️ CI/CD 流程相关变更           | `ci: 修复 GitHub Actions 错误` |
| `build`       | 📦 构建相关（如 webpack、npm）  | `build: 修改打包配置`          |
| `revert`      | ⏪ 回滚之前的提交               | `revert: 回滚 user 模块修改`   |

## push

```sh
# 关联本地仓库与github远程仓库
# 可选: 修改 <git@github.com> 为你本地的 .ssh/config 的配置,如: <githubifourx>
git remote add origin <git@github.com>:你的用户名/仓库名.git

# 将本地分支提交上传到 GitHub
# 首次与远程分支关联：git push -u origin feature  # 推送到远程feature并关联（本地分支名与远程分支名相同，可以省略`:<远程分支名>`）
# 远程分支不存在时会自动创建
# git push -u origin feature:feature，只需执行一次，后续直接使用 git push 就行，再次执行命令可以重新关联到新分支名
git push -u <远程主机名> <本地分支名>:[远程分支名]
git push <远程主机名> <本地分支名>:[远程分支名]
git push origin devlop:devlop
```
