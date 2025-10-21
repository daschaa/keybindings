import React, {ChangeEventHandler, useEffect, useRef} from "react"
import './index.css'

interface BindingInputProps {
    onChange: ChangeEventHandler<HTMLInputElement>
}

const BindingInput = (props: BindingInputProps) => {
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus()
    }, []);
    return (
        <input
            ref={inputRef}
            id="binding-input"
            type="text"
            name="name"
            placeholder='Keybindings'
            onChange={props.onChange}
        />
    )
}

export default BindingInput