import { Link } from 'react-router-dom';
import styles from './styles.module.css';

function NotFoundPage() {
    return (
        <div className={styles.notFoundPage}>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <img
                        src='/src/assets/img/02_404.png'
                        alt="404"
                        className={styles.image404}
                    />
                </div>

                <h1>Page Not Found</h1>

                <p>
                    We're sorry, the page you requested could not be found.<br />
                    Please go back to the homepage.
                </p>

                <Link to="/" className={styles.homeButton}>
                    Go Home
                </Link>
            </div>
        </div>
    );
}

export default NotFoundPage;