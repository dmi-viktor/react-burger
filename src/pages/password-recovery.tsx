import React, { FC } from 'react';
import styles from './login.module.css';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation, Redirect, useHistory } from 'react-router-dom';
import PasswordField from '../components/password-field/password-field';
import InputField from '../components/input-field/input-field';
import { useSelector } from 'react-redux';
import { restorePassword } from '../utils/burger-api';
import Preloader from '../components/preloader/preloader';
import { TLocataionState } from '../utils/types';

type TLocataionStateFrom = TLocataionState & {
    from: string
}

const PasswordRecoveryPage: FC = () => {
    const location = useLocation<TLocataionStateFrom>();
    // @ts-ignore
    const auth = useSelector(state => state.auth);    
    const history = useHistory();
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const [form, setValue] = React.useState<{ email: string }>({ email: '' });
    const [isRequest, setIsRequest] = React.useState<boolean>(false);

    if (auth.isAuth) {
        return (
            <Redirect
                to={location.state?.from || '/'}
            />
        );
    }

    function sendRecoveryPassword(e: React.FormEvent) {
        e.preventDefault();
        setIsRequest(true);
        restorePassword(form.email)
            .then(data => {
                if (data.success) {
                    history.replace({
                        pathname: `/reset-password`,
                        state: { restorePassword: location }
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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    
    return (
        <div className={styles.loginWrapper}>
            <form className={styles.form} onSubmit={sendRecoveryPassword}>

                <span className={`text text_type_main-large ${styles.title}`}>Восстановление пароля</span>

                <div className={`pt-6 pb-6`}>
                    <InputField placeholder='Укажите E-mail' inputName='email' onChange={onChange}/>
                </div>
                {
                    // @ts-ignore
                    <Button type="primary" size="medium">
                        Восстановить
                    </Button>
                }
                <span className={`pt-5 text text_type_main-small ${styles.errorMessage}`}>{errorMessage}</span>

                <div className={`pt-15 text text_type_main-default text_color_inactive ${styles.hint}`}>
                    <span>Вспомнили пароль?</span> <Link className={styles.link} to='/login'>Войти</Link>
                </div>

            </form>
            {
                isRequest && <Preloader description='Отправка письма...' />
            }
        </div>
    );
}

export default PasswordRecoveryPage;