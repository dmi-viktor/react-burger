import React from 'react';
import Style from './tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { render } from 'react-dom';

export default function Tabs() {
    const [current, setCurrent] = React.useState('bun');

    React.useEffect(() => {
        document.getElementById(`${current}`).scrollIntoView();
    });

    return (
        <div style={{ display: 'flex' }}>
            <Tab value="bun" active={current === 'bun'} onClick={() => setCurrent('bun')}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={() => setCurrent('sauce')}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={() => setCurrent('main')}>
                Начинки
            </Tab>
        </div>
    );
}