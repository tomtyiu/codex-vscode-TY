# Codex VS Code Extension

This extension adds a command to run the Codex CLI from VS Code. Activate the command **Codex: Run Prompt** from the Command Palette and pick from several built-in commands or provide your own prompt. Codex will run in a new terminal session.

The default command list includes:

- Explain codebase
- Refactor code
- Write unit
- Write unit tests for code
- Look for vulnerabilities for code

The extension relies on the `@openai/codex` package from this workspace and spawns `npx codex` inside the terminal.
