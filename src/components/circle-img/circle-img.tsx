import React, { useRef, FC } from 'react';
import style from './circle-img.module.css';

interface ICircleImg {
    uri: string;
    countHidden?: number;
    index?: number;
}

const CircleImg: FC<ICircleImg> = ({ uri, countHidden, index }) => {
    return (
        <div className={`${style.miniature}`} style={{ zIndex: index}}>
            <img src={uri} style={countHidden && 1 <= countHidden ? { opacity: "0.3" } : {}} />
            {
                countHidden &&
                1 <= countHidden &&
                <span className={`text text_type_digits-default ${style.ingredientCount}`}>+{countHidden}</span>
            }
        </div>
        );
}

export default CircleImg;