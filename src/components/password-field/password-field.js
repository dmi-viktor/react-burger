import React from 'react';
import styles from './password-field.module.css';
import PropTypes from 'prop-types';

import { Input, ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function PasswordField({ placeholder, onChange }) {
    const [value, setValue] = React.useState('');    
    const inputRef = React.useRef(null);
    const [isPasswordShown, setIsPasswordShown] = React.useState(false);

    var togglePasswordVisibility = (e) => {
        var isShown = !isPasswordShown;
        setIsPasswordShown(isShown);
        inputRef.current.setAttribute('type', isShown ? 'text' : 'password');
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

PasswordField.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};