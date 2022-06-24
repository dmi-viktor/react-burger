import React from 'react';
import styles from './login.module.css';

import { Button, Input, ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';

import PasswordField from '../components/password-field/password-field.js';
import InputField from '../components/input-field/input-field';
import { useSelector, useDispatch } from 'react-redux';
import { loginOnServer } from '../services/actions/auth.js';

export function LoginPage() {
    const dispatch = useDispatch();
    const [form, setValue] = React.useState({ email: '', password: '' });
    const history = useHistory();
    const [errorMessage, setErrorMessage] = React.useState(null);
    const auth = useSelector(state => state.auth);

    const location = useLocation();

    const processResult = (isSuccess, message) => {
        if (isSuccess) {
            history.replace({ pathname: '/' });
        }
        else {
            if (message) {
                setErrorMessage(message);
            }
        }
    }

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    let login = React.useCallback(
        e => {
            e.preventDefault();            
            dispatch(loginOnServer(form.email, form.password, processResult));
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

                <span className={`text text_type_main-large ${styles.title}`}>Вход</span>

                <div className={`pt-6`}>
                    <InputField placeholder='E-mail' inputName='email' onChange={onChange} />
                </div>

                <div className='pt-6 pb-6'>
                    <PasswordField placeholder='Пароль' inputName='password' onChange={onChange} />
                </div>

                <Button type="primary" size="medium" onClick={login}>
                    Войти
                </Button>

                <span className={`pt-5 text text_type_main-small ${styles.errorMessage}`}>{errorMessage}</span>

                <div className={`pt-20 text text_type_main-default text_color_inactive ${styles.hint}`}>
                    <span>Вы новый пользователь?</span> <Link className={styles.link} to='/register'>Зарегистрироваться</Link>
                </div>

                <div className={`pt-4 text text_type_main-default text_color_inactive ${styles.hint}`}>
                    <span>Забыли пароль?</span> <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link>
                </div>

            </form>
        </div>
    );
} 