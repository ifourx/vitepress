# Copilot on Github

## Automatic code review

Set up Copilot to automatically review pull requests for you, a repository, or an organization.
[automatic code review](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-automatic-review#configuring-automatic-code-review-for-a-single-repository)

## Copilot CLI

Autopilot 模式: `Shift + Tab`
切换到此模式下建议选择 Enable all permissions, 否则会自动拒绝审批请求

### use case

```text
Suggest improvements to content.js

Rewrite the readme in this project to make it more accessible to newcomers

<!-- issue & PRs -->
List my open PRs

I've been assigned this issue: https://github.com/octo-org/octo-repo/issues/1234. Start working on this for me in a suitably named branch.

Raise an improvement issue in octo-org/octo-repo. In src/someapp/somefile.py the `file = open('data.txt', 'r')` block opens a file but never closes it.

Check the changes made in PR https://github.com/octo-org/octo-repo/pull/57575. Report any serious errors you find in these changes.
```

## Rolling back changes

press `Esc` twice

Rewind is unavailable in the following situations:

- Files over 10 MB.
- More than 500 changed files.

## remote

`/keep-alive` prevent your machine from going to sleep
`/remote on`
`copilot --continue` 重新连接

## config

typically located at `~/.copilot/settings.json`

```json
{
  // remote always be enabled
  "remoteSessions": true
}
```

## /fleet

将任务拆分给多个子agents并行处理,每个子agents有独立的context,建议少用,增加token消耗

配合 Autopilot 模式使用

## plan

plan mode: 先规划再执行,建议多用,减少token消耗

## /research

对你的prompt给出非常详细的报表,使用 `ctrl` + `y` 查看生成的文件

## /chronicle

会话数据存储于本地,使用`/chronicle`访问本地会话数据

- `/chronicle standup`：生成简短报告，汇总最近 CLI 会话中处理的内容，包括分支名称、拉取请求链接和状态检查。
- `/chronicle tips`：提供个性化提示，以便更有效地使用 Copilot 命令行界面（CLI） 。
- `/chronicle improve`：分析会话历史记录，以识别出哪些模式可能导致 Copilot 误解你的意图或在沟通过程中有大量来回的交流，并生成自定义说明，以帮助 Copilot 在将来更好地理解你的需求。
- `/chronicle reindex`：根据您会话历史文件重建会话存储。

tips

- 在一天开始时：运行 /chronicle standup last 3 days 以生成最近工作内容和你正在使用的 CLI 会话的提醒。
- 定期进行级别提升：每周或两次运行 /chronicle tips ，以发现可能缺少的功能和工作流改进。
- 当 Copilot 不断犯相同的错误时：运行 /chronicle improve 以标识模式并生成自定义指令以修复它。
- 回顾过去的工作：问一个自由格式的问题，例如“我是否处理了与付款 API 相关的任何内容？” Copilot 将会搜索你的历史记录。
- 要继续以前的工作：使用 copilot --continue 或 copilot --resume 来接续你之前的进度

## lsp服务器

## /resume

恢复以前的对话(context)

## Context

### MCP

### Spaces

###

# Creation

- `Create a pull request for the recent changes in the user-auth module and include a summary of the updates.`

- `Run all tests and linters for the payment-processing module and provide a summary of any issues or errors found.`

## Review

- ask Copilot to review changes while you're coding in your IDE
- assign Copilot as a reviewer on your pull request

## Testing

- `What additional tests should I include to ensure full coverage for this module?`

## Deployment

- `Write a deployment script for a Node.js application using GitHub Actions to deploy to an AWS EC2 instance.`

- `Set up a GitHub Actions workflow to build, test, and deploy a Python application to Heroku.`

- `Analyze this deployment log and suggest why the deployment failed.`

## Operation

运维阶段可以将 issue 指派给 **Copilot cloud agent**

You can use the **Copilot cloud agent** as an autonomous agent that can help maintain and improve your application in production.
Assign a GitHub issue to Copilot, and it will autonomously explore the repository, identify potential fixes, and create a pull request with the proposed changes. Then it will automatically request a review from you.

- `How can I optimize the database queries in this code to improve performance?`

# Billing

## AI Credits

- `input tokens`: what's sent to the model.
- `output tokens`: what the model generates.
- `cached tokens`: context the model reuses or stores.

Each token is priced based on the model used, and the total is converted into AI credits.

1 AI credit = $0.01 USD.

# How-tos

## Copilot on Github

[Automatic code review](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-automatic-review)

## Customize Copilot

### 1. Add custom instructions

instructions优先级:

Personal instructions > Repository instructions > Organization instructions

#### repository-wide

Ask [Copilot cloud agent](https://github.com/copilot/agents) to generate a copilot-instructions.md file:

```text
Onboard this repository to Copilot cloud agent by adding a .github/copilot-instructions.md file. Include information about project structure, coding conventions, the test framework, and how to build and run the project.
```

```md
Your task is to "onboard" this repository to Copilot cloud agent by adding a .github/copilot-instructions.md file in the repository that contains information describing how a cloud agent seeing it for the first time can work most efficiently.

You will do this task only one time per repository and doing a good job can SIGNIFICANTLY improve the quality of the agent's work, so take your time, think carefully, and search thoroughly before writing the instructions.

<Goals>
- Reduce the likelihood of a cloud agent pull request getting rejected by the user due to generating code that fails the continuous integration build, fails a validation pipeline, or having misbehavior.
- Minimize bash command and build failures.
- Allow the agent to complete its task more quickly by minimizing the need for exploration using grep, find, str_replace_editor, and code search tools.
</Goals>

<Limitations>
- Instructions must be no longer than 2 pages.
- Instructions must not be task specific.
</Limitations>

<WhatToAdd>

Add the following high level details about the codebase to reduce the amount of searching the agent has to do to understand the codebase each time:

<HighLevelDetails>
- A summary of what the repository does.
- High level repository information, such as the size of the repo, the type of the project, the languages, frameworks, or target runtimes in use.
</HighLevelDetails>

Add information about how to build and validate changes so the agent does not need to search and find it each time.

<BuildInstructions>
- For each of bootstrap, build, test, run, lint, and any other scripted step, document the sequence of steps to take to run it successfully as well as the versions of any runtime or build tools used.
- Each command should be validated by running it to ensure that it works correctly as well as any preconditions and postconditions.
- Try cleaning the repo and environment and running commands in different orders and document errors and misbehavior observed as well as any steps used to mitigate the problem.
- Run the tests and document the order of steps required to run the tests.
- Make a change to the codebase. Document any unexpected build issues as well as the workarounds.
- Document environment setup steps that seem optional but that you have validated are actually required.
- Document the time required for commands that failed due to timing out.
- When you find a sequence of commands that work for a particular purpose, document them in detail.
- Use language to indicate when something should always be done. For example: "always run npm install before building".
- Record any validation steps from documentation.
</BuildInstructions>

List key facts about the layout and architecture of the codebase to help the agent find where to make changes with minimal searching.

<ProjectLayout>
- A description of the major architectural elements of the project, including the relative paths to the main project files, the location of configuration files for linting, compilation, testing, and preferences.
- A description of the checks run prior to check in, including any GitHub workflows, continuous integration builds, or other validation pipelines.
- Document the steps so that the agent can replicate these itself.
- Any explicit validation steps that the agent can consider to have further confidence in its changes.
- Dependencies that aren't obvious from the layout or file structure.
- Finally, fill in any remaining space with detailed lists of the following, in order of priority: the list of files in the repo root, the contents of the README, the contents of any key source files, the list of files in the next level down of directories, giving priority to the more structurally important and snippets of code from key source files, such as the one containing the main method.
</ProjectLayout>
</WhatToAdd>

<StepsToFollow>
- Perform a comprehensive inventory of the codebase. Search for and view:
- README.md, CONTRIBUTING.md, and all other documentation files.
- Search the codebase for build steps and indications of workarounds like 'HACK', 'TODO', etc.
- All scripts, particularly those pertaining to build and repo or environment setup.
- All build and actions pipelines.
- All project files.
- All configuration and linting files.
- For each file:
- think: are the contents or the existence of the file information that the cloud agent will need to implement, build, test, validate, or demo a code change?
- If yes:
   - Document the command or information in detail.
   - Explicitly indicate which commands work and which do not and the order in which commands should be run.
   - Document any errors encountered as well as the steps taken to workaround them.
- Document any other steps or information that the agent can use to reduce time spent exploring or trying and failing to run bash commands.
- Finally, explicitly instruct the agent to trust the instructions and only perform a search if the information in the instructions is incomplete or found to be in error.
</StepsToFollow>
- Document any errors encountered as well as the steps taken to work-around them.
```

#### path-specific

.github/instructions/NAME.instructions.md

```md
---
applyTo: "app/models/**/*.rb"
---
```

apply the instructions to all TypeScript files in the repository

```md
---
applyTo: "**/*.ts,**/*.tsx"
---
```

the following file will only be read by `"cloud-agent"`, not `"code-review"`

```md
---
applyTo: "**"
excludeAgent: "code-review"
---
```

### 2. Add custom agent

configuration: [YAML frontmatter properties](https://docs.github.com/en/copilot/reference/custom-agents-configuration#yaml-frontmatter-properties) , [Tool aliases](https://docs.github.com/en/copilot/reference/custom-agents-configuration#tool-aliases)

examples: [Custom agents](https://docs.github.com/en/copilot/tutorials/customization-library/custom-agents) , [awesome-copilot](https://github.com/github/awesome-copilot)

`.github/agents/CUSTOM-AGENT-NAME.md`

`bug-fixer.agent.md`

```yaml
---
name: Bug Fixer
description: Diagnoses and fixes bugs reported in GitHub issues.
tools:
  - read
  - edit
  - terminal
  - search
---

You are a bug-fixing specialist. When given a bug report or issue:

1. Reproduce the bug by writing a failing test.
2. Identify the root cause.
3. Fix the code.
4. Verify the fix passes the test and doesn't break existing tests.

Always follow the project's testing conventions and coding standards.
```

#### agent skills

For **project skills**, specific to a single repository, create a `.github/skills`, `.claude/skills`, or `.agents/skills` directory in your repository.

For **personal skills**, shared across projects, create a `~/.copilot/skills` or `~/.agents/skills` directory in your local home directory.

Within the `skills` directory, create a subdirectory for your new skill. Each skill should have its own directory (for example, `.github/skills/webapp-testing`).

In your skill subdirectory, create a `SKILL.md` file containing your skill's instructions.

文件名必须为 `SKILL.md`

#### MCP on Github

[Extend cloud agent with MCP](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/extend-cloud-agent-with-mcp)

#### Hooks

##### Copilot cloud agent

JSON files stored in your repository at `.github/hooks/\*.json`.

##### GitHub Copilot CLI

personal hooks store in `~/.copilot/hooks/*.json`

### 3. Space

## Copilot for Github task

prompt examples

```text
<!-- issue -->
Log a bug for a 500 error. This happens consistently when I try to log into the site.
Create a task to change the application logo background to red and add the label "needs design review".
<!-- use image error -->
Create an issue because this error appears when trying to reset a password.

<!-- pull request -->
In the header of the text field, select , then click Summary.

<!-- branch, merge -->
Create a new branch called [BRANCH-NAME] in the repository [OWNER/REPO-NAME].
Merge the pull request [PR-NUMBER] in the repository [OWNER/REPO-NAME].
```

## TODO Use Copilot agents

https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/overview

## Chat with Copilot in IDE

`Write code`

You can ask Copilot to write code for you.

- `write a function to sum all numbers in a list`
- `add error handling to this function`

### Slash commands

Use slash commands to avoid writing complex prompts for common scenarios.

see all available slash commands
[GitHub Copilot Chat cheat sheet](https://docs.github.com/en/copilot/reference/chat-cheat-sheet?tool=vscode#slash-commands-1) or [Slash commands](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features#_slash-commands)

`/new`
Use the `/new` slash command to set up a new project.

- `/new react app with typescript`
- `/new python django web application`

---

`/fix`

If your active file contains an error, use the `/fix` slash command to ask Copilot to fix the error.

- `/fix`

---

`/tests`

Use the `/tests` slash command to ask Copilot to write tests for the active file or selected code.

- `/tests`
- `/tests ensure the function rejects an empty list`

---

### Chat variables

Use chat variables to include specific context in your prompt.

To see all available chat variables, type `#` in the chat prompt box. See also [GitHub Copilot Chat cheat sheet](https://docs.github.com/en/copilot/reference/chat-cheat-sheet?tool=vscode#chat-variables).

Use chat variables like `#selection`, `#file`, `#editor`, `#codebase`, or `#git`.

- `#file:gameReducer.js #file:gameInit.js how are these files related`

### Chat participants

Chat participants are like domain experts who have a specialty that they can help you with.See all available [chat participants](https://docs.github.com/en/copilot/reference/chat-cheat-sheet?tool=vscode#chat-participants)

`@terminal`

Has context about the Visual Studio Code terminal shell and its contents.

- `how to update an npm package`
- `@terminal find the largest file in the src directory`
- `@terminal /explain #terminalLastCommand` to explain the last command and any errors

---

`@vscode`

Has context about Visual Studio Code commands and features.

- `@vscode tell me how to debug a golang app`
- `@vscode show release note`

---

`@workspace`

Has context about the code in your workspace.Use @workspace when you want Copilot to consider the structure of your project, how different parts of your code interact, or design patterns in your project.

---

`@github`

Allows you to use GitHub-specific Copilot skills.

- `@github Search the web to find the latest GPT model from OpenAI.`
- `@github #web What is the latest LTS of Node.js?`
- `@github What skills are available?`

## Explore

[Explore a codebase](https://docs.github.com/en/copilot/tutorials/explore-a-codebase)

[Explore issues and discussions](https://docs.github.com/en/copilot/tutorials/explore-issues-and-discussions)

## TODO

## Cloud agent

[Cloud agent](https://docs.github.com/en/copilot/tutorials/cloud-agent)

## Spark
