import React from 'react';
import styles from './profile.module.css';
import { useSelector, useDispatch } from '../../services/hooks';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { editUserDataOnServer } from '../../services/actions/auth';

export default function Profile() {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const auth = useSelector(state => state.auth);

    const [nameValue, setNameValue] = React.useState<string>(auth.user.name);
    const [emailValue, setEmailValue] = React.useState<string>(auth.user.email);
    const [passwordValue, setPasswordValue] = React.useState<string>('');

    const resetNameValue = () => setNameValue(auth.user.name);
    const resetEmailValue = () => setEmailValue(auth.user.email);
    const resetPasswordValue = () => setPasswordValue('');

    const resetForm = () => {
        resetNameValue();
        resetEmailValue();
        resetPasswordValue();
    }

    const processResult = (isSuccess: boolean, message: string) => {
        if (!isSuccess && message) {
            setErrorMessage(message);
        } else {
            resetPasswordValue();
        }
    }

    const editProfile = React.useCallback(
        (e?: React.SyntheticEvent<Element, Event>) => {
            // @ts-ignore
            dispatch(editUserDataOnServer(emailValue, passwordValue, nameValue, processResult));
        },
        [emailValue, passwordValue, nameValue]
    );

    return (
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
                    {
                        // @ts-ignore //TODO: Не понимаю, что делать с этой строкой? 
                        <Button type="primary" size="small" onClick={editProfile}>Сохранить</Button>
                    }
                </div>
            }
            <span className={`pt-5 text text_type_main-small ${styles.errorMessage}`}>{errorMessage}</span>
        </div>
        );
}