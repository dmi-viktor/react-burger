import React from 'react';
import styles from './title-button.module.css';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch } from 'react-router-dom';

export default function TitleButton(props) {
    const isActive = !!useRouteMatch({ path: props.target, exact: props.target === '/' });

    return (
        <NavLink className={`pt-4 pb-4 pr-5 pl-5 ${styles.titleButton}`} style={{ opacity: (isActive ? '1' : '0.6') }} to={props.target} >
            {props.children}
            <span className={`pl-2 ${styles.buttonContent}`}>{props.content}</span>
        </NavLink>
    );
}

TitleButton.propTypes = {
    content: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    target: PropTypes.string.isRequired 
};