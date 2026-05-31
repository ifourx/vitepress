---
outline: [2, 4]
---

# Keyboard Shortcuts

::: tip Note
Not all of the following shortcut keys are universally compatible with every variant of Unix and Linux. Some of these shortcut keys are designed for use in a terminal environment, while others are for use in a desktop environment.
:::

## Terminal environment

### Moving the cursor

| shortcut keys | introduction                                   |
| :------------ | :--------------------------------------------- |
| Ctrl+B        | Moves the cursor backward one character.       |
| Ctrl+F        | Moves the cursor forward one character.        |
| Esc+B         | Moves the cursor backward one word.            |
| Esc+F         | Moves the cursor forward one word.             |
| Ctrl+A        | Moves the cursor to the beginning of the line. |
| Ctrl+E        | Moves the cursor to the end of the line.       |

### Edit

| shortcut keys | introduction                                                            |
| :------------ | :---------------------------------------------------------------------- |
| Ctrl+H        | Erase one character. Similar to pressing backspace.                     |
| Ctrl+D        | Logs out of the current session.                                        |
| Ctrl+U        | Erases the line forward from the cursor.                                |
| Ctrl+K        | Erases the line backward from the cursor.                               |
| Ctrl+W        | 删除当前光标到临近左边单词结束                                          |
| Esc+D         | 删除当前光标到临近右边单词开始, 改键为 alt+d.                           |
| Esc+.         | 粘帖最后一次命令最后的参数（通常用于 mkdir long-dir 后, cd 配合着 alt+. |
| Ctrl+L        | 相当于 `clear` 命令                                                     |
| Cmd+R         | 换到新屏，不会像 `clear` 一样创建一个空屏                               |

### Other

| shortcutkeys |                                                                                    introduction                                                                                    |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Ctrl+P       |                                                                              Paste previous line(s).                                                                               |
| Ctrl+N       |                                                                                Paste next line(s).                                                                                 |
| Ecs+P        |                                                      上一条命令（例如输入 ls, 然后按 `Esc+P` , 就会找到历史记录下的 ls 命令）                                                      |
| Ecs+N        |                                                                                     下一条命令                                                                                     |
| Ctrl+R       |                                                           Allows you to search for a previously used command or switch.                                                            |
| Ctrl+S       |                                                                         Stops all output on-screen (XOFF).                                                                         |
| Ctrl+Q       |                                               Turns all output stopped on-screen back on (XON). Also, closes an application window.                                                |
| Ctrl+C       |                                                                       Cancels the currently running command.                                                                       |
| Ctrl+Z       | Cancels the current operation, moves back a directory or takes the current operation and moves it to the background. See `bg` command for additional information about background. |

## vim 快捷键

### 一般模式

| shortcut keys | introduction                                    |
| :------------ | :---------------------------------------------- |
| %             | 括号上跳转                                      |
| zz            | 当前行置为屏幕中央                              |
| zt            | top 当前行                                      |
| zb            | bottom 当前行                                   |
| w             | 向前移动一个词 （上一个字母和数字组成的词之后） |
| dw            | 向前删除一个词                                  |
| W             | 向前移动一个词 （以空格分隔的词）               |
| [num]w        | 向前移动[num]个词                               |
| b             | 向后移动一个词 （下一个字母和数字组成的词之前） |
| db            | 向后删除一个词                                  |
| B             | 向后移动一个词 （以空格分隔的词）               |
| [num]b        | 向后移动[num]个词                               |
| h             | 光标左移                                        |
| j             | 光标下移                                        |
| k             | 光标上移                                        |
| l             | 光标右移                                        |
| 0             | 移动光标到当前行首                              |
| ^             | 移动光标到当前行首非空字符处                    |
| $             | 移动光标到当前行尾                              |
| gg            | 移动光标到首行                                  |
| G             | 移动光标到尾行                                  |
| [num]G        | 光标移动到第[num]行                             |
| Ctrl+d        | 屏幕向后移动半页                                |
| Ctrl+u        | 屏幕向前移动半页                                |
| Ctrl+b        | 屏幕向后移动一页                                |
| Ctrl+f        | 屏幕向前移动一页                                |
| x             | 向后删除一个字符                                |
| X             | 向前删除一个字符                                |
| d0            | 删除至行首                                      |
| d$            | 删除至行末                                      |
| D             | 删除至行末                                      |
| d(            | 删除至句头                                      |
| d)            | 删除至句尾                                      |
| dgg           | 删至文件开头                                    |
| dG            | 删至文件末尾                                    |
| [num]x        | 向后删除[num]个字符                             |
| [num]dd       | 向下删除剪切[num]行                             |
| [num]yy       | 向下复制[num]行                                 |
| ["x]yy        | 复制当前行至寄存器 `x`                          |
| [num]p        | 粘贴刚删除或复制剪切的文本[num]次               |
| [num]P        | 向上粘贴刚删除或复制剪切的文本[num]次           |
| ["x]p         | 在当前行之后粘贴寄存器 `x` 中的内容             |
| u             | 撤销 undo 操作                                  |
| Ctrl+r        | 反撤销 undo                                     |
| ZZ            | 退出 Vim，如果文件被改动过，保存改动内容        |
| ZQ            | 与 `:q!` 相同，退出 Vim，不保存文件改动         |
| V             | 进入逐行可视模式，实现删除或复制剪切            |
| v             | 进入逐字可视模式，实现删除或复制剪切            |
| Ctrl+v        | 块模式                                          |
| Shift+v       | 行模式                                          |
| ?search_test  | 检索文档，在光标前面的部分搜索 search_text      |

### 编辑模式

| shortcut keys | introduction            |
| :------------ | :---------------------- |
| r{char}       | 替换字符                |
| R             | 覆写模式                |
| i             | 光标处 `insert`         |
| I             | 光标行首 `insert`       |
| a             | 光标后 `insert`         |
| A             | 光标行尾 `insert`       |
| o             | 当前行的下一行 `insert` |
| O             | 当前行的上一行 `insert` |

### 命令模式

| shortcut keys               | introduction                                                                |
| :-------------------------- | :-------------------------------------------------------------------------- |
| :set [no]nu                 | 显示[取消]行号                                                              |
| :set ff[=unix]              | 查看[修改格式为 unix]文件格式                                               |
| :set [no]paste              | 设置[取消]paste 模式来复制粘贴                                              |
| :r \<filename\>             | 在光标下方插入文件 \<filename\> 的内容                                      |
| :reg                        | 显示寄存器的内容                                                            |
| :%s/original/replacement    | 检索第一个 “original” 字符串并将其替换成 “replacement”                      |
| :%s/original/replacement/g  | 检索并将所有的 “original” 替换为 “replacement”                              |
| :%s/original/replacement/gc | 检索出所有的 “original” 字符串，但在替换成 “replacement” 前，先询问是否替换 |
| :n1, n2/word1/word2/g       | 在 n1-n2 行之间查找 word1 并替换为 word2，不加 g 只替换每行的第一个 word1   |
| :x                          | 保存退出                                                                    |
