import React from 'react';
import styles from './index.module.css';
import Link from '../link'

const Aside = () => {
    return (
        <aside className={styles.aside}>
        <ul >
            <Link href="#" type="aside" title="Going to 1" />
            <Link href="#" type="aside" title="Going to 2" />
            <Link href="#" type="aside" title="Going to 3" />
            <Link href="#" type="aside" title="Going to 4" />
            <Link href="#" type="aside" title="Going to 5" />
            <Link href="#" type="aside" title="Going to 6" />
            <Link href="#" type="aside" title="Going to 7" />
            <Link href="#" type="aside" title="Going to 8" />
            <Link href="#" type="aside" title="Going to 9" />
            <Link href="#" type="aside" title="Going to 10" />
            <Link href="#" type="aside" title="Going to 11" />
        </ul>
    </aside>
    );
}

export default Aside