"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function getCommands(extensionPath) {
    try {
        const pkgJsonPath = path.join(extensionPath, 'package.json');
        const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
        return Array.isArray(pkg.codexCommands) ? pkg.codexCommands : [];
    }
    catch (_a) {
        return [];
    }
}
function activate(context) {
    const commands = getCommands(context.extensionPath);
    const disposable = vscode.commands.registerCommand('codex.prompt', async () => {
        const items = commands.map((c) => ({ label: c }));
        items.push({ label: 'Custom prompt...' });
        const selection = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select a command or enter a custom prompt',
        });
        if (!selection) {
            return;
        }
        let prompt;
        if (selection.label === 'Custom prompt...') {
            prompt = await vscode.window.showInputBox({
                prompt: 'Enter a prompt for Codex',
            });
        }
        else {
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
function deactivate() { }
//# sourceMappingURL=extension.js.map
