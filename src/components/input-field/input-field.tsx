import React from 'react';
import styles from './input-field.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'

interface IInputField {
    placeholder: string;
    inputName: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    defaultValue?: string;
    icon?: "CurrencyIcon" | "BurgerIcon" | "LockIcon" | "DragIcon" | "DeleteIcon" | "ArrowUpIcon" | "ArrowDownIcon" | "MenuIcon" | "CloseIcon" | "CheckMarkIcon" | "ListIcon" | "ProfileIcon" | undefined;
}

export default function InputField({ placeholder, inputName, onChange, defaultValue, icon }: IInputField) {
    const [value, setValue] = React.useState<string>(defaultValue || '');

    return (
            <Input
            type={'text'}
            placeholder={placeholder}
            onChange={e => { setValue(e.target.value); onChange(e); }}
            value={value}
            name={inputName}
            icon={icon}
            size={'default'}
            />
        );
}