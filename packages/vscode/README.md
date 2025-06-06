# Codex VS Code Extension

This extension adds a command to run the Codex CLI from VS Code. Activate the command **Codex: Run Prompt** from the Command Palette and pick from several built-in commands or provide your own prompt. Codex will run in a new terminal session.

The default command list includes:

- Explain codebase
- Refactor code
- Write unit
- Write unit tests for code
- Look for vulnerabilities for code

The extension relies on the `@openai/codex` package from this workspace and spawns `npx codex` inside the terminal.

## Installing the Codex CLI

1. Install **Node.js 22 or newer** from [nodejs.org](https://nodejs.org/) if you don't already have it.
2. Install Codex globally:

   ```bash
   npm install -g @openai/codex
   ```

3. Set your OpenAI API key as an environment variable:

   ```bash
   export OPENAI_API_KEY="your-api-key-here"
   ```

   You can also place this key in a `.env` file at your project root and Codex will load it automatically.

## Using Codex in VS Code

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Choose **Codex: Run Prompt**.
3. Pick one of the default prompts or select **Custom prompt...** to type your own.
4. A new terminal will appear running `codex` with your prompt. Follow the CLI instructions to apply or discard the suggested changes.

