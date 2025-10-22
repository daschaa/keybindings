import React, {ChangeEvent, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import BindingInput from "./binding-input";
import BindingList, {BindingItem} from "./binding-list";
import createFuzzySearch from "@nozbe/microfuzz";


function fuzzySearch(shortcuts: Array<{ shortcut: string; description: string }>, filteredBinding: string) {
    const fuzzySearchFn = createFuzzySearch<BindingItem>(shortcuts, {
        key: 'description',
    })
    const fuzzyResults = fuzzySearchFn(filteredBinding)
    return fuzzyResults.map(item => item.item);
}

const App = () => {
    const [filteredBinding, setFilteredBinding] = useState<string>("");
    const [shortcuts, setShortcuts] = useState<Array<{ shortcut: string; description: string }>>([]);
    const [filteredItems, setFilteredItems] = useState<BindingItem[] | undefined>(undefined);

    window.api.onBindings(items => {
        setShortcuts(items);
    });

    useEffect(() => {
        if (filteredBinding != '' && shortcuts.length > 0) {
            const items = fuzzySearch(shortcuts, filteredBinding);
            setFilteredItems(items)
        }
    }, [shortcuts, filteredBinding]);

    return (
        <div>
            <BindingInput onChange={(e: ChangeEvent<HTMLInputElement>) => setFilteredBinding(e.target.value)}/>
            <BindingList list={filteredItems ? filteredItems : shortcuts}/>
        </div>
    )
}

const root = createRoot(document.body);
root.render(<App/>);