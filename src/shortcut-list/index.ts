import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import defaultShortcuts from './shortcuts.json';

export const loadShortcutList = (): Array<{ shortcut: string; description: string }> => {
    const dir = path.join(os.homedir(), '.keybindings');
    const file = path.join(dir, 'shortcuts.json');

    if (!fs.existsSync(file)) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        try {
            fs.writeFileSync(file, JSON.stringify(defaultShortcuts, null, 2), { encoding: 'utf8' });
        } catch (err) {
            console.error('failed to write shortcuts file:', err);
            return defaultShortcuts;
        }
        return defaultShortcuts;
    }

    try {
        const data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('failed to read shortcuts file:', err);
        return defaultShortcuts;
    }
};
