import React from 'react';
import styles from './profile-navigation.module.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editUserDataOnServer, logoutOnServer } from '../../services/actions/auth.js';


export default function ProfileNavigation() {
    let history = useHistory();
    const dispatch = useDispatch();
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
        <div className={styles.navigationWrapper}>
            <div className={styles.profileLink}>
                <NavLink className={`text text_type_main-medium`} activeClassName={styles.profileLinkActive} to='/profile' exact={true}>Профиль</NavLink>
            </div>
            <div className={styles.profileLink}>
                <NavLink className={`text text_type_main-medium`} activeClassName={styles.profileLinkActive} to='/profile/orders' exact={true}>История заказов</NavLink>
            </div>
            <div className={styles.profileLink}>
                <button className={`text text_type_main-medium ${styles.logoutBtn}`} onClick={logout}>Выход</button>
            </div>

            <span className="pt-20 text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</span>
        </div>
        );
}