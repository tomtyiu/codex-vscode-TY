import * as vscode from 'vscode';

const recipes = [
  'Explain this codebase to me',
  'Create the fanciest todo-list app',
  'Refactor the Dashboard component to React Hooks',
  'Generate SQL migrations for adding a users table',
  'Write unit tests for utils/date.ts',
  'Bulk-rename *.jpeg -> *.jpg with git mv',
  'Explain what this regex does: ^(?=.*[A-Z]).{8,}$',
  'Carefully review this repo, and propose 3 high impact well-scoped PRs',
  'Look for vulnerabilities and create a security review report',
];

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('codex.prompt', async () => {
    const items: vscode.QuickPickItem[] = recipes.map((r) => ({ label: r }));
    items.push({ label: 'Custom prompt...' });

    const selection = await vscode.window.showQuickPick(items, {
      placeHolder: 'Select a recipe or enter a custom prompt',
    });

    if (!selection) {
      return;
    }

    let prompt: string | undefined;
    if (selection.label === 'Custom prompt...') {
      prompt = await vscode.window.showInputBox({
        prompt: 'Enter a prompt for Codex',
      });
    } else {
      prompt = selection.label;
    }

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
