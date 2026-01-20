import styles from './styles.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h3>Contact</h3>
                    <p>Phone: +49 30 915-88492</p>
                    <p>Address: Wallstraße 9-13, 10179 Berlin, Deutschland</p>
                    <p>Working Hours: 24 hours a day</p>
                </div>

                <div className={styles.section}>
                    <h3>Socials</h3>
                    <div className={styles.socials}>
                        <a href="#">Instagram</a>
                        <a href="#">WhatsApp</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;