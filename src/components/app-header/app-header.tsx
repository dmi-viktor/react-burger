import React from 'react';
import headerStyle from './app-header.module.css';
import TitleButton from '../title-button/title-button';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/hooks';
import { Link } from 'react-router-dom';

export default function AppHeader() {
    const auth = useSelector(state => state.auth);

    return (
        <header className={headerStyle.header}>
            <div className={headerStyle.headerBox}>
                <nav className={headerStyle.navigation}>

                    <TitleButton content="Конструктор" target="/">
                        <BurgerIcon type="primary" />
                    </TitleButton>

                    <TitleButton content="Лента заказов" target="/feed">
                        <ListIcon type="primary" />
                    </TitleButton>

                </nav>

                <Link to='/' className={headerStyle.logo}>
                    <Logo />
                </Link>

                <TitleButton content={auth.isAuth ? auth.user.name : "Личный кабинет"} target="/profile" dataCy="profile">
                    <ProfileIcon type="primary" />
                </TitleButton>
            </div>
        </header>
    );
}