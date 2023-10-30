import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../Layout.module.scss'

const Index: NextPage = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <p>Chat</p>
            </main>
        </div>
    );
};

export default Index;
