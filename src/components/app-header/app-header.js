import React from 'react';
import headerStyle from './app-header.module.css';
import TitleButton from '../title-button/title-button';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader() {
    return (
        <header className={headerStyle.header}>
            <div className={headerStyle.headerBox}>
                <nav className={headerStyle.navigation}>
                    <TitleButton content="Конструктор" >
                        <BurgerIcon type="primary" />
                    </TitleButton>

                    <TitleButton content="Лента заказов" >
                        <ListIcon type="primary" />
                    </TitleButton>
                </nav>
                <div className={headerStyle.logo}>
                    <Logo />
                </div>

                <TitleButton content="Личный кабинет">
                    <ProfileIcon type="primary" />
                </TitleButton>
            </div>
        </header>
    );
}