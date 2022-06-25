import React from 'react';
import styles from './login.module.css';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation, Redirect, useHistory } from 'react-router-dom';
import PasswordField from '../components/password-field/password-field.js';
import InputField from '../components/input-field/input-field';
import { useSelector } from 'react-redux';
import { saveNewPassword } from '../utils/burger-api.js';
import Preloader from '../components/preloader/preloader.js';

export function PasswordRecovery2Page() {
    const location = useLocation();
    const auth = useSelector(state => state.auth);    

    const [errorMessage, setErrorMessage] = React.useState(null);
    const [form, setValue] = React.useState({ password: '', token: '' });
    const [isRequest, setIsRequest] = React.useState(false);

    const restorePassword = location.state && location.state.restorePassword;
    const history = useHistory();

    if (auth.isAuth || !restorePassword) {
        return (
            <Redirect
                to={location.state?.from || '/'}
            />
        );
    }

    function sendRecoveryPassword(e) {
        e.preventDefault();
        setIsRequest(true);
        saveNewPassword(form.password, form.token)
            .then(data => {
                if (data.success) {
                    history.replace({
                        pathname: `/login`,
                    });
                }
                else {
                    setErrorMessage(data.message);
                }
                setIsRequest(false);
            })
            .catch(e => {
                setErrorMessage(e.message);
                setIsRequest(false);
            });
    }

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.loginWrapper}>
            <form className={styles.form} onSubmit={sendRecoveryPassword}>

                <span className={`text text_type_main-large ${styles.title}`}>Восстановление пароля</span>

                <div className='pt-6'>
                    <PasswordField placeholder='Введите новый пароль' inputName='password' onChange={onChange} />
                </div>

                <div className={`pt-6 pb-6`}>
                    <InputField placeholder='Введите код из письма' inputName='token' onChange={onChange}/>
                </div>

                <Button type="primary" size="medium">
                    Сохранить
                </Button>

                <span className={`pt-5 text text_type_main-small ${styles.errorMessage}`}>{errorMessage}</span>

                <div className={`pt-15 text text_type_main-default text_color_inactive ${styles.hint}`}>
                    <span>Вспомнили пароль?</span> <Link className={styles.link} to='/login'>Войти</Link>
                </div>

            </form>
            {
                isRequest && <Preloader description='Установка нового пароля...' />
            }
        </div>
    );
} 