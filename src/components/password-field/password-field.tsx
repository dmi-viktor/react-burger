import React, { FunctionComponent } from 'react';
import styles from './password-field.module.css';

import { Input } from '@ya.praktikum/react-developer-burger-ui-components'

type TPasswordField = {
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField: FunctionComponent<TPasswordField> = ({ placeholder, onChange }) => {
    const [value, setValue] = React.useState<string>('');    
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isPasswordShown, setIsPasswordShown] = React.useState<boolean>(false);

    var togglePasswordVisibility = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        var isShown = !isPasswordShown;
        setIsPasswordShown(isShown);
        inputRef?.current?.setAttribute('type', isShown ? 'text' : 'password');
    }

    return (
        <Input
            type={'password'}
            placeholder={placeholder}
            icon={isPasswordShown ? 'ShowIcon' : 'HideIcon'}
            value={value}
            onChange={e => { setValue(e.target.value); onChange(e); }}
            name={'password'}
            error={false}
            onIconClick={togglePasswordVisibility}
            errorText={'Ошибка'}
            size={'default'}
            ref={inputRef}
        />
    );
}

export default PasswordField;