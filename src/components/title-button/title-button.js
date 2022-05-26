import React from 'react';
import titleButtonStyle from './title-button.module.css';
import PropTypes from 'prop-types';

/* т.к. в задании не говорилось про использование кнопок для шапки из библиотеки,
   описал стили кнопок по своему вразумению 
*/

export default function TitleButton(props) {
    return (
        <a className={`pt-4 pb-4 pr-5 pl-5 ${titleButtonStyle.titleButton}`} >
            {props.children}
            <span className={`pl-2 ${titleButtonStyle.buttonContent}`}>{props.content}</span>
        </a>
    );
}

TitleButton.propTypes = {
    content: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
};