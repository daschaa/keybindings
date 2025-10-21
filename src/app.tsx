import React, {ChangeEvent, useState} from 'react';
import {createRoot} from 'react-dom/client';
import BindingInput from "./binding-input";
import BindingList from "./binding-list";
const App = () => {
    const [filteredBinding, setFilteredBinding] = useState<string>("");
    const [shortcuts, setShortcuts] = useState<Array<{ shortcut: string; description: string }>>([]);
    window.api.onBindings(items => {
        setShortcuts(items);
    });
    
    return (
        <div>
            <BindingInput onChange={(e: ChangeEvent<HTMLInputElement>) => setFilteredBinding(e.target.value)}/>
            <BindingList
                list={
                    filteredBinding != ''
                        ? shortcuts.filter(
                            item =>
                                item.shortcut.includes(filteredBinding) || item.description.includes(filteredBinding)
                        )
                        : shortcuts}/>
        </div>
    )
}

const root = createRoot(document.body);
root.render(<App/>);