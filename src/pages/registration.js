import React from 'react';
import styles from './registration.module.css';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import PasswordField from '../components/password-field/password-field.js';
import InputField from '../components/input-field/input-field';
import { useSelector, useDispatch } from 'react-redux';
import { registerOnServer } from '../services/actions/auth.js';

export function RegistrationPage() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [form, setValue] = React.useState({ email: '', password: '', name: '' });
    const auth = useSelector(state => state.auth);
    const history = useHistory();

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    // Был вдохновлен примером из теории, прошу критиковать!
    const processResult = (message) => {
        if (auth.isAuth) {
            history.replace({ pathname: '/' });
        }
        else {
            if (message) {
                setErrorMessage(message);
            }
        }
    }

    const register = React.useCallback(
        e => {
            e.preventDefault();
            dispatch(registerOnServer(form.email, form.password, form.name, processResult));
        },
        [form]
    );

    if (auth.isAuth) {
        return (
            <Redirect
                to={location.state?.from || '/'}
            />
        );
    }

    return (
        <div className={styles.loginWrapper}>
            <form className={styles.form}>

                <span className={`text text_type_main-large ${styles.title}`}>Регистрация</span>

                <div className={`pt-6`}>
                    <InputField placeholder='Имя' inputName='name' onChange={onChange} />
                </div>

                <div className={`pt-6`}>
                    <InputField placeholder='E-mail' inputName='email' onChange={onChange} />
                </div>

                <div className='pt-6 pb-6'>
                    <PasswordField placeholder='E-mail' inputName='password' onChange={onChange} />
                </div>

                <Button type="primary" size="medium" onClick={register}>
                    Зарегистрироваться
                </Button>

                <span className={`pt-5 text text_type_main-small ${styles.errorMessage}`}>{errorMessage}</span>

                <div className={`pt-10 text text_type_main-default text_color_inactive ${styles.hint}`}>
                    <span>Уже зарегистрированы?</span> <Link className={styles.link} to='/login'>Войти</Link>
                </div>

            </form>
        </div>
    );
} 