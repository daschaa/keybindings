export {};

declare global {
    interface Window {
        api: {
            onBindings(callback: (bindings: { shortcut: string; description: string }[]) => void): void;
        };
    }
}