import React from 'react';
import styles from './profile.module.css';

import { Button, Input, EditIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useHistory } from 'react-router-dom';
import PasswordField from '../components/password-field/password-field.js';
import InputField from '../components/input-field/input-field';
import { useSelector, useDispatch } from 'react-redux';
import { editUserDataOnServer, logoutOnServer } from '../services/actions/auth.js';


export function ProfilePage() {
    let history = useHistory();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = React.useState(null);
    const auth = useSelector(state => state.auth);

    const [nameValue, setNameValue] = React.useState(auth.user.name);
    const [emailValue, setEmailValue] = React.useState(auth.user.email);
    const [passwordValue, setPasswordValue] = React.useState('');

    const resetNameValue = () => setNameValue(auth.user.name);
    const resetEmailValue = () => setEmailValue(auth.user.email);
    const resetPasswordValue = () => setPasswordValue('');

    const resetForm = () => {
        resetNameValue();
        resetEmailValue();
        resetPasswordValue();
    }

    const processResult = (isSuccess, message) => {
        if (!isSuccess && message) {
            setErrorMessage(message);
        } else {
            resetPasswordValue();
        }
    }

    const editProfile = React.useCallback(
        e => {
            e.preventDefault();
            dispatch(editUserDataOnServer(emailValue, passwordValue, nameValue, processResult));
        },
        [emailValue, passwordValue, nameValue]
    );

    const logout = React.useCallback(
        e => {
            e.preventDefault();
            dispatch(logoutOnServer(() => {
                history.replace({ pathname: '/login' });
            }));
        },
        []
    );

    return (
        <div className={`pt-15 ${styles.profileWrapper}`}>
            <div className={styles.navigationWrapper}>
                <div className={styles.profileLink}>
                    <NavLink className={`text text_type_main-medium`} activeClassName={styles.profileLinkActive} to='/profile'>Профиль</NavLink>
                </div>
                <div className={styles.profileLink}>
                    <NavLink className={`text text_type_main-medium`} activeClassName={styles.profileLinkActive} to='/ordersHistory'>История заказов</NavLink>
                </div>
                <div className={styles.profileLink}>
                    <button className={`text text_type_main-medium ${styles.logoutBtn}`} onClick={logout}>Выход</button>
                </div>

                <span className="pt-20 text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</span>
            </div>
            <div className={`ml-15 ${styles.contentWrapper}`}>
                <div className={`${styles.input}`}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        icon={nameValue !== auth.user.name ? 'CloseIcon' : 'EditIcon'}
                        value={nameValue}
                        onChange={e => { setNameValue(e.target.value); setNameValue(e.target.value); }}
                        name={'name'}
                        onIconClick={resetNameValue}
                        size={'default'}
                    />
                </div>
                <div className={`pt-6 ${styles.input}`}>
                    <Input
                        type={'text'}
                        placeholder={'Логин'}
                        icon={emailValue !== auth.user.email ? 'CloseIcon' : 'EditIcon'}
                        value={emailValue}
                        onChange={e => { setEmailValue(e.target.value); setEmailValue(e.target.value); }}
                        name={'email'}
                        onIconClick={resetEmailValue}
                        size={'default'}
                    />
                </div>

                <div className={`pt-6 ${styles.input}`}>
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        icon={passwordValue !== '' ? 'CloseIcon' : 'EditIcon'}
                        value={passwordValue}
                        onChange={e => { setPasswordValue(e.target.value); setPasswordValue(e.target.value); }}
                        name={'password'}
                        onIconClick={resetPasswordValue}
                        size={'default'}
                    />
                </div>
                {
                    (auth.user.name !== nameValue || auth.user.email !== emailValue || passwordValue !== '')

                    &&

                    <div className={`pt-5 ${styles.buttonsWrapper}`}>
                        <button className={` pr-5 mr-5 text text_type_main-small ${styles.cancelBtn}`} onClick={resetForm}>Отмена</button>
                        <Button type="primary" size="small" onClick={editProfile}>Сохранить</Button>
                    </div>
                }
                <span className={`pt-5 text text_type_main-small ${styles.errorMessage}`}>{errorMessage}</span>
            </div>
        </div>
    );
} 