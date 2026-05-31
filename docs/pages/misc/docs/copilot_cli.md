# Customize your environment

**Supported locations (in order of discovery):**

| Location                                    | Scope                 |
| ------------------------------------------- | --------------------- |
| `~/.copilot/copilot-instructions.md`        | All sessions (global) |
| `.github/copilot-instructions.md`           | Repository            |
| `.github/instructions/**/*.instructions.md` | Repository (modular)  |
| `AGENTS.md` (in Git root or cwd)            | Repository            |
| `Copilot.md`, `GEMINI.md`, `CODEX.md`       | Repository            |

A community-created collection of custom agents, instructions, skills, hooks, workflows, and plugins to supercharge your GitHub Copilot experience.
[Awesome GitHub Copilot](https://github.com/github/awesome-copilot#whats-in-this-repo)

# configure allowed tools

To reset previously approved tools, use:`/reset-allowed-tools`

# Use your own model provider

Run `copilot help providers` for full setup instructions.

This allows the CLI to access any file path, use any tool, and access any URL without prompting for confirmation.
Use with caution, as it grants the CLI full access and automation capabilities.

## 1233

> ![Static Badge](https://img.shields.io/badge/Terminal-text?logo=gnometerminal&labelColor=0969da&color=ddf4ff)
>
> ```
> copilot --allow-all --enable-all-github-mcp-tools
> ```

## subagents

```
/review
/task
/fleet
```

/resume

/plan

/skills

/diff
/remote
/mcp

## plan mode

Press `Shift` + `Tab` to toggle between normal mode and plan mode.
Alternatively, you can use the `/plan` command in normal mode to achieve the same effect.

### `/fleet`

在plan mode中生成plan.md后使用`/fleet`执行plan

### Monitoring progress

Use the `/tasks` slash command to see a list of background tasks relating to the current session. This will include any subtasks handled by subagents when you use the `/fleet` command.

## Session

> ![Static Badge](https://img.shields.io/badge/CLI-Prompt-text?style=flat-square&logo=github-copilot&labelColor=8250df&color=fbefff)
>
> ```text
> Add these functions to my existing calculator.js based on latest issue created:
> 1. modulo(a, b) - returns the remainder of a divided by b
> 2. power(base, exponent) - returns base raised to the exponent
> 3. squareRoot(n) - returns the square root of n with error handling for negative numbers
> ```

`/session`: Shows details about your current chat session.

`/context`: Provides a visual overview of your current token usage

`/usage`:Lets you view your session statistics,including:

- The amount of premium requests used in the current session
- The session duration
- The total lines of code edited
  A breakdown of token usage per model

`/share [file|gist|html|research] [path]`: Share session to Markdown file or GitHub gist

Use `/clear` or `/new` between unrelated tasks. 清空context

`/session files` 查看当前session中的临时生成的文件

使用 `/compact` 手动触发手动压缩

`/session checkpoints [num]` 查看某次压缩时,context的提炼内容

`/rename`: rename session

`/resume`: To continue previous work

### `/chronicle`

generate standup reports, get personalized tips, and receive suggestions for improving your `.github/copilot-instructions.md` file.

- At the start of your day: Run `/chronicle standup last 3 days` to generate a reminder of what you worked on recently and the CLI session you were working in.

- Periodically, to level up: Run `/chronicle tips` every week or two to discover features and workflow improvements you might be missing.

- When Copilot keeps making the same mistake: Run `/chronicle improve` to identify the pattern and generate custom instructions to fix it.

- `/chronicle reindex`: Rebuilds the session store from your session history files.

## Hands-on practice

[Take flight with GitHub Copilot](https://learn.github.com/skills#take-flight-with-github-copilot)

## Global shortcuts

```text
 @             mention files, include contents in context
 Esc           cancel the current operation
 !             execute command in your local shell (bypass Copilot)
 ctrl+c        cancel operation / clear input / exit
 ctrl+d        shutdown
 ctrl+l        clear the screen, 不影响context
 shift+tab     switch between plan mode and regular interactive mode
 ctrl+y        预览plan mode下生成的plan.md,可以编辑此文件添加更多细节
 ctrl+o        在terminal中展开所有时间线,当terminal中没内容时等同于 ctrl+e
```

double Esc keypress: Rewind to a previous point
If there's text in the input area, pressing Esc twice in quick succession clears the text. `/undo` `rewind`

## Tips

Run shell commands

### Enable remote control for a Copilot CLI session

Use the `/keep-alive` slash command to prevent your machine from going to sleep while you're away.

enable remote control `/remote on`

## Connecting to VS Code

Managing the connection with the `/ide` slash command

To continue a CLI session in VS Code's integrated terminal, **right-click** the session in the Sessions view and choose **Resume in Terminal**. This is a quick way to pick up work from an external terminal window without losing any session context.

## Hand off task

- **Autopilot mode** runs locally in your CLI session.
- `/delegate` or `&` pushes the task to Copilot cloud agent on GitHub.

## Managing pull requests with the `/pr` command

[manage-pull-requests](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/manage-pull-requests)

## Automate with Actions

[Authenticate](https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/automate-with-actions#authenticate)

## Customize Copilot CLI

### Instructions

Copilot CLI supports:

- Repository-wide instructions in the `.github/copilot-instructions.md` file.
- Path-specific instructions files: `.github/instructions/**/*.instructions.md`.
- Agent files such as `AGENTS.md`.

For more information, see [Adding custom instructions for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions).

> [!NOTE]
>
> - `.github/copilot-instructions.md` 定义代码与项目规范 (技术栈、架构、全局代码风格等)
> - `.github/instructions/**/*.instructions.md` 对指定的文件或目录补充专属逻辑 (通过`applyTo`关键字指定)
> - `AGENTS.md` 定义行为与任务 (主智能体在当前仓库下的角色扮演、特定工作流执行方式)

### Hooks

For more information, see GitHub Copilot [hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference)

- [Tool Guardian](https://awesome-copilot.github.com/hooks/#file=hooks%2Ftool-guardian%2FREADME.md)
- [Session Logger](https://awesome-copilot.github.com/hooks/#file=hooks%2Fsession-logger%2FREADME.md)
- [Secrets Scanner](https://awesome-copilot.github.com/hooks/#file=hooks%2Fsecrets-scanner%2FREADME.md)

### Skills

> [!NOTE] How do Agent Skills work?
> Agents load skills through progressive disclosure, in three stages:
>
> 1. **Discovery**: At startup, agents load only the name and description of each available skill, just enough to know when it might be relevant.
> 2. **Activation**: When a task matches a skill's description, the agent reads the full SKILL.md instructions into context.
> 3. **Execution**: The agent follows the instructions, optionally executing bundled code or loading referenced files as needed.

- [LSP server](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/add-lsp-servers)

### MCP

### Agents

Use custom agents

[Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)

GEM Multi-Agent Workflow

- [Gem Orchestrator](https://awesome-copilot.github.com/agents/#file=agents%2Fgem-orchestrator.agent.md)

- [Gem Planner](https://awesome-copilot.github.com/agents/#file=agents%2Fgem-planner.agent.md)

- [Gem Implementer](https://awesome-copilot.github.com/agents/#file=agents%2Fgem-implementer.agent.md)

- [Gem Debugger](https://awesome-copilot.github.com/agents/#file=agents%2Fgem-debugger.agent.md)

- [Gem Critic](https://awesome-copilot.github.com/agents/#file=agents%2Fgem-critic.agent.md)

- [Gem Designer](https://awesome-copilot.github.com/agents/#file=agents%2Fgem-designer.agent.md)

- [Gem Code Simplifier](https://awesome-copilot.github.com/agents/#file=agents%2Fgem-code-simplifier.agent.md)

- [Gem Devops](https://awesome-copilot.github.com/agents/#file=agents%2Fgem-devops.agent.md)

- [Gem Reviewer](https://awesome-copilot.github.com/agents/#file=agents%2Fgem-reviewer.agent.md)

- [Gem Documentation Writer](https://awesome-copilot.github.com/agents/#file=agents%2Fgem-documentation-writer.agent.md)

- [Gem Researcher](https://awesome-copilot.github.com/agents/#file=agents%2Fgem-researcher.agent.md)

- [Gem Skill Creator](https://awesome-copilot.github.com/agents/#file=agents%2Fgem-skill-creator.agent.md)

### Plugins

plugins market: [awesome-copilot](https://awesome-copilot.github.com/plugins/)

installed path: `~/.copilot/installed-plugins/`

Github Copilot [CLI plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference)

```text
/plugin marketplace list

/plugin list
/plugin install PLUGIN-NAME@MARKETPLACE-NAME
/plugin uninstall PLUGIN-NAME
```

## Copilot CLI reference

Find commands and keyboard shortcuts to help you use Copilot CLI effectively.

### [Command-line commands](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)

## Agent Package Manager

docs: [Agent Package Manager](https://github.com/microsoft/apm)

## agentrc

github: [agentrc](https://github.com/microsoft/agentrc)

## prompt

git
`Create and push a new branch called 'create-calc-app'`

> [!IMPORTANT]
> If you have restarted your codespace you may need to run `copilot --allow-all --enable-all-github-mcp-tools` and then authenticate with GitHub again by running `/login` from within the Copilot CLI session.

::: tip Create
![Static Badge](https://img.shields.io/badge/CLI-Prompt-text?style=flat-square&logo=github-copilot&labelColor=8250df&color=fbefff)
Create a README template

```text
Create a README template for a new open-source project that includes sections for project description, installation instructions, usage examples, and contribution guidelines. Make it clear and easy to follow.
```

Triage and summarize repository activity

```text
Summarize activity in this repository over the past week. Highlight anything that looks blocked or urgent, and suggest what I should prioritize.
```

:::

::: tip Testing
![Static Badge](https://img.shields.io/badge/CLI-Prompt-text?style=flat-square&logo=github-copilot&labelColor=8250df&color=fbefff)

Generating unit tests

```text
/tests Generate unit tests for this function. Validate both success and failure, and include edge cases.
```

Updating unit tests to match code changes

```text
Given the update to the `calculate_discount` function, update the unit tests that may fail or become outdated as a result.
```

Creating mock objects to abstract layers

```text
/tests Create a unit test to ensure the service is called correctly. Mock the service object.
```

Creating end-to-end tests for a webpage

```text
Using Playwright, generate an e2e test to ensure the product displays correctly.
```

:::

## Customization library

[Custom instructions](https://docs.github.com/en/copilot/tutorials/customization-library/custom-instructions)

[Custom skills](https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files)

[Custom agents](https://docs.github.com/en/copilot/tutorials/customization-library/custom-agents)
