import React, { FC } from 'react';
import styles from './not-found.module.css';
import { Link } from 'react-router-dom';

const NotFound404 = () => {
	return (
		<div className={styles.errorWrapper}>
			<span className="text text_type_main-large">Oops! 404 Error</span>
			<span className="text text_type_main-medium">The page you requested does not exist</span>
			<span className="text text_type_main-default text_color_inactive">check the address or try  <Link className={styles.link} to='/'>homepage</Link></span>
		</div>
	);
}

export default NotFound404;