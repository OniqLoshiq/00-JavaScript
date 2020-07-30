import React from 'react';
import styles from './index.module.css';
import logo from '../../images/blue-origami-bird.png'

const Origami = (props) => {
    return (
        <div className={styles.origami}>
            <img src={logo} alt='Origami'></img>
            <p className={styles.description}>
                {props.description}
            </p>
            <div>
                <span>
                    <small>Author:</small>
                    {props.author}
                </span>
            </div>
        </div>
    );
}

export default Origami;