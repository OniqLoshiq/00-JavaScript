import React from 'react';
import styles from './index.module.css';
import Link from '../link';
import logo from '../../images/blue-origami-bird-flipped.png'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <ul >
                <Link href="#" type="footer" title="Going to 1" />
                <Link href="#" type="footer" title="Going to 2" />
                <Link href="#" type="footer" title="Going to 3" />
                <Link href="#" type="footer" title="Going to 4" />
                <Link href="#" type="footer" title="Going to 5" />
                <Link href="#" type="footer" title="Going to 6" />
                <Link href="#" type="footer" title="Going to 7" />
                <Link href="#" type="footer" title="Going to 8" />
                <Link href="#" type="footer" title="Going to 9" />
                <Link href="#" type="footer" title="Going to 10" />
                <Link href="#" type="footer" title="Going to 11" />
                <img className={styles.logo} src={logo} alt='Origami logo'></img>
            </ul>
            <p>Software University 2020</p>
        </footer>
    );
}

export default Footer