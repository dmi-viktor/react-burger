import React from 'react';
import styles from './profile.module.css';

import ProfileNavigation from '../components/profile-navigation/profile-navigation.js'
import Profile from '../components/profile/profile.js'
import OrdersHistory from '../components/profile-orders/profile-orders.js'
import { useRouteMatch } from 'react-router-dom'

export function ProfilePage() {
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