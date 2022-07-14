import React, { FC } from 'react';
import styles from './login.module.css';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation, Redirect, useHistory } from 'react-router-dom';
import PasswordField from '../components/password-field/password-field';
import InputField from '../components/input-field/input-field';
import { useSelector } from 'react-redux';
import { saveNewPassword } from '../utils/burger-api';
import Preloader from '../components/preloader/preloader';
import { TLocataionState } from '../utils/types';

type TLocataionStateFrom = TLocataionState & {
    from: string,
    restorePassword: { background: Location }
}

const PasswordRecovery2Page: FC = () => {
    const location = useLocation<TLocataionStateFrom>();
    // @ts-ignore
    const auth = useSelector(state => state.auth);    

    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const [form, setValue] = React.useState<{ password: string, token: string }>({ password: '', token: '' });
    const [isRequest, setIsRequest] = React.useState<boolean>(false);

    const restorePassword = location.state && location.state.restorePassword;
    const history = useHistory();

    if (auth.isAuth || !restorePassword) {
        return (
            <Redirect
                to={location.state?.from || '/'}
            />
        );
    }

    function sendRecoveryPassword(e: React.FormEvent) {
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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.loginWrapper}>
            <form className={styles.form} onSubmit={sendRecoveryPassword}>

                <span className={`text text_type_main-large ${styles.title}`}>Восстановление пароля</span>

                <div className='pt-6'>
                    <PasswordField placeholder='Введите новый пароль' onChange={onChange} />
                </div>

                <div className={`pt-6 pb-6`}>
                    <InputField placeholder='Введите код из письма' inputName='token' onChange={onChange}/>
                </div>
                {
                    // @ts-ignore
                    <Button type="primary" size="medium">
                        Сохранить
                    </Button>
                }

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

export default PasswordRecovery2Page;