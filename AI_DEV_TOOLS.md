# AI Sensei — Open-Source AI Developer Tools

A comparison of the best open-source AI developer tools available today, including whether they're open source, have a free tier, support bringing your own API (BYO API), and what they're best suited for.

The open-source AI coding ecosystem has grown rapidly, with a split between **coding assistants** (autocomplete and chat) and **coding agents** (which can plan, edit code, run commands, and complete tasks autonomously).

## Tool comparison

| Tool | Open Source | Free Tier | Bring Your Own API | Best For | Description |
|------|:-----------:|:---------:|:------------------:|----------|-------------|
| **Continue** | ✅ | ✅ | ✅ | AI coding assistant | IDE extension for VS Code/JetBrains supporting OpenAI, Anthropic, Gemini, Ollama, OpenRouter, and more. Chat, autocomplete, code editing, custom prompts. |
| **Cline** | ✅ | ✅ | ✅ | Autonomous coding | Reads your project, edits files, runs terminal commands, debugs, and creates pull requests using your chosen LLM. |
| **Roo Code** | ✅ | ✅ | ✅ | Advanced coding agent | Fork of Cline with multiple agent modes, planning, architecture analysis, and automation workflows. |
| **Aider** | ✅ | ✅ | ✅ | Terminal development | Git-aware AI pair programmer that edits multiple files from the command line while preserving Git history. |
| **OpenHands** | ✅ | ✅ | ✅ | Full software engineer agent | Formerly OpenDevin. Can browse the web, execute code in sandboxes, use a terminal, and perform multi-step software engineering tasks. |
| **Goose** | ✅ | ✅ | ✅ | Automation agent | Originally developed by Block. General-purpose developer agent with MCP support and tool integrations. |
| **Tabby** | ✅ | ✅ | ✅ | Local Copilot | Self-hosted AI autocomplete server similar to GitHub Copilot with privacy-focused deployments. |
| **OpenCode** | ✅ | ✅ | ✅ | CLI coding agent | Lightweight command-line coding assistant designed for autonomous development workflows. |
| **OpenClaw** | ✅ | ✅ | ✅ | Personal AI assistant | Local AI agent that connects to messaging platforms and external LLMs with a skills system for automation. |
| **Bolt.diy** | ✅ | ✅ | ✅ | Full-stack app builder | Self-hosted version of Bolt that generates and edits complete web applications from prompts. |

## IDE assistants

These focus on helping while you write code.

- **Continue** — closest open-source alternative to GitHub Copilot.
- **Tabby** — self-hosted autocomplete server.
- **OpenCode** — lightweight coding assistant.

## Coding agents

These can work independently.

- Cline
- Roo Code
- OpenHands
- Goose
- Aider

These can:

- Read an entire repository
- Create new files
- Refactor code
- Execute terminal commands
- Run tests
- Fix bugs
- Generate documentation
- Use MCP servers and external tools

## Local AI support

All of the following can work with local models via **Ollama**:

- Continue
- Cline
- Roo Code
- Aider
- OpenHands
- Tabby
- OpenCode

Popular local models include:

- Qwen 3 Coder
- DeepSeek Coder V2
- Code Llama
- Llama 3.1
- Mistral
- Gemma

## Cloud providers you can plug into

Most BYO API tools support one or more of:

- OpenAI
- Anthropic
- Google Gemini
- OpenRouter
- Ollama
- Groq
- Together AI
- Fireworks AI
- Azure OpenAI
- AWS Bedrock

## Best choices by use case

| Goal | Recommendation |
|------|----------------|
| Best GitHub Copilot replacement | Continue |
| Best autonomous coding agent | Cline |
| Best multi-agent system | Roo Code |
| Best terminal coding assistant | Aider |
| Best self-hosted autocomplete | Tabby |
| Best software engineering agent | OpenHands |
| Best for complete local development | Continue + Ollama + Tabby |
| Best open-source AI stack | Continue + Roo Code + OpenHands + Ollama + OpenRouter |

## Recommended stack for these projects

For building AI-powered apps, Japanese learning software, and eventually a business platform, a strong fully open-source stack would be:

- **Continue** — for in-editor AI assistance
- **Roo Code** — for autonomous coding tasks
- **OpenHands** — for long-running software engineering workflows
- **Ollama** — for local model hosting
- **OpenRouter** — for access to many cloud LLMs through one API
- **Supabase** — for database, authentication, storage, and edge functions
- **MCP (Model Context Protocol)** — for integrating tools and external services

This combination gives you a powerful, low-cost developer environment with the flexibility to switch between local and cloud models as your needs grow.
