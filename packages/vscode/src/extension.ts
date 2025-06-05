import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('codex.prompt', async () => {
    const prompt = await vscode.window.showInputBox({
      prompt: 'Enter a prompt for Codex',
    });

    if (!prompt) {
      return;
    }

    const terminal = vscode.window.createTerminal({ name: 'Codex' });
    terminal.show(true);
    const escaped = prompt.replace(/"/g, '\\"');
    terminal.sendText(`npx codex "${escaped}"`);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
