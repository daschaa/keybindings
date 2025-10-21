import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    onBindings(callback: (bindings: {shortcut: string, description: string}[]) => void) {
        ipcRenderer.on('bindings', (_ev, bindings: {shortcut: string, description: string}[]) => callback(bindings));
    },
});