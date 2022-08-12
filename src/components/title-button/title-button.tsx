import React, { FC } from 'react';
import styles from './title-button.module.css';
import { NavLink, useRouteMatch } from 'react-router-dom';

interface ITitleButton {
    content: string;
    children: React.ReactNode;
    target: string;
    dataCy?: string;
}

const TitleButton: FC<ITitleButton> = (props) => {
    const isActive = !!useRouteMatch({ path: props.target, exact: props.target === '/' });

    return (
        <NavLink className={`pt-4 pb-4 pr-5 pl-5 ${styles.titleButton}`} style={{ opacity: (isActive ? '1' : '0.6') }} to={props.target} >
            {props.children}
            <span className={`pl-2 ${styles.buttonContent}`} data-cy={`${props.dataCy}`}>{props.content}</span>
        </NavLink>
    );
}

export default TitleButton;