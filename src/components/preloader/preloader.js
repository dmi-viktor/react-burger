import React from 'react';
import styles from './preloader.module.css';

export default function Preloader({ description }) {
    return (
        <div className={styles.preloaderWrapper}>
            <div className={`text text_type_main-medium ${styles.preloaderDescription}`}>
                {description}
            </div>
        </div>
    );
}