import React, { FunctionComponent }  from 'react';
import styles from './preloader.module.css';

const Preloader: FunctionComponent<{ description: string }> = ({ description }) => {
    return (
        <div className={styles.preloaderWrapper}>
            <div className={`text text_type_main-medium ${styles.preloaderDescription}`}>
                {description}
            </div>
        </div>
    );
}

export default Preloader;