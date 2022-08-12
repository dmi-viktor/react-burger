import React, { FC } from 'react';
import styles from './profile.module.css';

import ProfileNavigation from '../components/profile-navigation/profile-navigation'
import Profile from '../components/profile/profile'
import OrdersHistory from '../components/profile-orders/profile-orders'
import { useRouteMatch } from 'react-router-dom'

const ProfilePage: FC = () => {
    const isProfile = !!useRouteMatch({ path: '/profile', exact: true });
    const isProfileOrders = !!useRouteMatch({ path: '/profile/orders', exact: true });

    return (
        <div className={`pt-15 ${styles.profileWrapper}`}>
            <ProfileNavigation />

            {
                isProfile &&
                <Profile />
            }
            {
                isProfileOrders &&
                <OrdersHistory />
            }
        </div>
    );
} 

export default ProfilePage;