import React from 'react';
import styles from './index.module.css';
import Link from '../link'
import logo from '../../images/white-origami-bird.png'

const Header = () => {
    return (
        <header className={styles.navigation}>
            <ul >
                <img className={styles.logo} src={logo} alt='Origami logo'></img>
                <Link href="#" type="header" title="Going to 1" />
                <Link href="#" type="header" title="Going to 2" />
                <Link href="#" type="header" title="Going to 3" />
                <Link href="#" type="header" title="Going to 4" />
                <Link href="#" type="header" title="Going to 5" />
                <Link href="#" type="header" title="Going to 6" />
                <Link href="#" type="header" title="Going to 7" />
                <Link href="#" type="header" title="Going to 8" />
                <Link href="#" type="header" title="Going to 9" />
                <Link href="#" type="header" title="Going to 10" />
                <Link href="#" type="header" title="Going to 11" />
            </ul>
        </header>
    )
}

export default Header;