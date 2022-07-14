import React, { FC } from 'react';
import style from './tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

interface ITabs {
    inViewBun: boolean;
    inViewSauce: boolean;
    inViewMain: boolean;
}

const Tabs: FC<ITabs> = ({ inViewBun, inViewSauce, inViewMain }) => {
    const [current, setCurrent] = React.useState<string>('bun');

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

    const rewindTo = (current: string) => { (document.getElementById(`${current}`) as unknown as HTMLElement).scrollIntoView(); };

    return (
        <div className={style.mainRow}>
            {
                // @ts-ignore
                <Tab value="bun" active={current === 'bun'} onClick={() => rewindTo('bun')}>
                    Булки
                </Tab>
            }
            {
                // @ts-ignore
                <Tab value="sauce" active={current === 'sauce'} onClick={() => rewindTo('sauce')}>
                    Соусы
                </Tab>
            }
            {
                // @ts-ignore
                <Tab value="main" active={current === 'main'} onClick={() => rewindTo('main')}>
                        Начинки
                </Tab>
            }
        </div>
    );
}

export default Tabs;