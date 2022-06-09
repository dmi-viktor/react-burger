import React from 'react';
import style from './tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export default function Tabs({ inViewBun, inViewSauce, inViewMain }) {
    const [current, setCurrent] = React.useState('bun');

    React.useEffect(() => {
        if (inViewBun) {
            setCurrent('bun');
        } else if (inViewSauce) {
            setCurrent('sauce');
        }
        else {
            setCurrent('main');
        }
    }, [inViewBun, inViewSauce, inViewMain]);

    const rewindTo = (current) => { document.getElementById(`${current}`).scrollIntoView(); };

    return (
        <div className={style.mainRow}>
            <Tab value="bun" active={current === 'bun'} onClick={() => rewindTo('bun')}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={() => rewindTo('sauce')}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={() => rewindTo('main')}>
                Начинки
            </Tab>
        </div>
    );
}