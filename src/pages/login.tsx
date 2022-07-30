import React, { FC } from 'react';
import styles from './login.module.css';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';

import PasswordField from '../components/password-field/password-field';
import InputField from '../components/input-field/input-field';
import { useSelector, useDispatch } from '../services/hooks';
import { loginOnServer } from '../services/actions/auth';
import { TLocataionState } from '../utils/types';

type TLocataionStateFrom = TLocataionState & {
    from: string
}

const LoginPage: FC = () => {
    const dispatch = useDispatch();
    const [form, setValue] = React.useState<{ email: string, password: string }>({ email: '', password: '' });
    const history = useHistory();
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const auth = useSelector(state => state.auth);

    const location = useLocation<TLocataionStateFrom>();

    const processResult = (isSuccess: boolean, message: string) => {
        if (isSuccess) {
            history.replace({ pathname: '/' });
        }
        else {
            if (message) {
                setErrorMessage(message);
            }
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const login = React.useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            // @ts-ignore
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
            <form className={styles.form} onSubmit={login}>

                <span className={`text text_type_main-large ${styles.title}`}>Вход</span>

                <div className={`pt-6`}>
                    <InputField placeholder='E-mail' inputName='email' onChange={onChange} />
                </div>

                <div className='pt-6 pb-6'>
                    <PasswordField placeholder='Пароль' onChange={onChange} />
                </div>
                {
                    // @ts-ignore
                    <Button type="primary" size="medium">
                            Войти
                    </Button>
                }

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

export default LoginPage;