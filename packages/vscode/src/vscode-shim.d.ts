declare module 'vscode' {
  export interface Disposable { dispose(): void }
  export interface ExtensionContext { subscriptions: Disposable[] }
  export interface QuickPickItem { label: string }
  export interface Terminal {
    show(preserveFocus: boolean): void
    sendText(text: string): void
  }
  export namespace window {
    function createTerminal(options: { name: string }): Terminal
    function showQuickPick(items: QuickPickItem[], options: { placeHolder?: string }): Promise<QuickPickItem | undefined>
    function showInputBox(options: { prompt: string }): Promise<string | undefined>
  }
  export namespace commands {
    function registerCommand(id: string, callback: (...args: any[]) => any): Disposable
  }
}
