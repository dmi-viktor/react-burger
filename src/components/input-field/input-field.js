import React from 'react';
import styles from './input-field.module.css';
import PropTypes from 'prop-types';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'

export default function InputField({ placeholder, inputName, onChange, defaultValue, icon }) {
    const [value, setValue] = React.useState(defaultValue || '');

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

InputField.propTypes = {
    placeholder: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.string,
    icon: PropTypes.string
};