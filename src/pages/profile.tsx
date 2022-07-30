import React, { FC } from 'react';
import styles from './profile.module.css';

import ProfileNavigation from '../components/profile-navigation/profile-navigation'
import Profile from '../components/profile/profile'
import OrdersHistory from '../components/profile-orders/profile-orders'
import { useRouteMatch } from 'react-router-dom'

const ProfilePage: FC = () => {
    return (
        <div className={`pt-15 ${styles.profileWrapper}`}>
            <ProfileNavigation />

            {
                !!useRouteMatch({ path: '/profile', exact: true }) &&
                <Profile />
            }
            {
                !!useRouteMatch({ path: '/profile/orders', exact: true }) &&
                <OrdersHistory />
            }
        </div>
    );
} 

export default ProfilePage;