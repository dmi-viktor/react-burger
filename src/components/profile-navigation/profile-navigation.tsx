import React, { FC } from 'react';
import styles from './profile-navigation.module.css';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch } from '../../services/hooks';
import { logoutOnServer } from '../../services/actions/auth';


const ProfileNavigation: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const logout = React.useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            // @ts-ignore
            dispatch(logoutOnServer(() => {
                history.replace({ pathname: '/login' });
            }));
        },
        []
    );

    const message = !!useRouteMatch({ path: "/profile", exact: true })
        ? 'В этом разделе вы можете изменить свои персональные данные'
        : 'В этом разделе вы можете просмотреть свою историю заказов';

    //const getMessage = React.useCallback(() => { // todo callback
    //    if (!!useRouteMatch({ path: "/profile", exact: true })) {
    //        return ;
    //    } else if (!!useRouteMatch({ path: "/profile/orders", exact: true })) {
    //        return ;
    //    } else {
    //        return '';
    //    }
    //}, []);

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

            <span className="pt-20 text text_type_main-default text_color_inactive">{message}</span>
        </div>
        );
}

export default ProfileNavigation;