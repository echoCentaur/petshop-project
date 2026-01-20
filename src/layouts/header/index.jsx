import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';

function Header() {
    const cartItems = useSelector(state => state.cart.items);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    {/*<div className={styles.logoIcon}></div>*/}
                    <span>Pet Shop</span>
                </Link>

                <nav className={styles.nav}>
                    <Link to="/">Main Page</Link>
                    <Link to="/categories">Categories</Link>
                    <Link to="/products">All products</Link>
                    <Link to="/sale">All sales</Link>
                </nav>

                <Link to="/cart" className={styles.cart}>
                    Cart {totalItems > 0 && <span>({totalItems})</span>}
                </Link>
            </div>
        </header>
    );
}

export default Header;