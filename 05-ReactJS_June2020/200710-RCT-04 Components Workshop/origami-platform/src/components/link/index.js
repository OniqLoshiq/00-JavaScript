import React from 'react';
import styles from './index.module.css';

const Link = (props) => {
    return (
        <li className={styles[`${props.type}-link`]}>
            <a href={props.href}>
                {props.title}
            </a>
        </li>
    );
}

export default Link