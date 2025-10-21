import React, {KeyboardEvent, KeyboardEventHandler, useEffect, useRef, useState} from 'react'
import './index.css'

interface BindingItem {
    shortcut: string
    description: string
}

interface BindingListProps {
    list: BindingItem[];
}

const BindingList = ({
                         list,
                     }: BindingListProps) => {

    return (
        <ul
            role="listbox"
            className="binding-list"
        >
            {list.map((item, index) => (
                <li
                    key={item.shortcut + '-' + index}
                    role="option"
                >
                    <span className={'binding-shortcut'}>
                        {item.shortcut}
                    </span>
                    <span className={'binding-description'}>
                        → {item.description}
                    </span>
                </li>
            ))}
        </ul>
    )
}
export default BindingList;