# Codex VS Code Extension

This extension adds a command to run the Codex CLI from VS Code. Activate the command **Codex: Run Prompt** from the Command Palette and provide a prompt. Codex will run in a new terminal session.

The extension relies on the `@openai/codex` package from this workspace and spawns `npx codex` inside the terminal.
