import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice';
import styles from './styles.module.css';

function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };


    const totalPrice = cartItems.reduce((sum, item) => {
        const price = item.discont_price || item.price;
        return sum + (price * item.quantity);
    }, 0);

    if (cartItems.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <h1>Shopping cart</h1>
                <p>Looks like you have no items in your basket currently.</p>
                <Link to="/products" className={styles.continueButton}>
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.cartPage}>
            <div className={styles.breadcrumbs}>
                <Link to="/">Main page</Link>
                <span> - </span>
                <span>Shopping cart</span>
            </div>

            <div className={styles.header}>
                <h1>Shopping cart</h1>
                <button onClick={handleClearCart} className={styles.clearButton}>
                    Clear cart
                </button>
            </div>

            <div className={styles.cartContainer}>

                <div className={styles.itemsList}>
                    {cartItems.map(item => (
                        <div key={item.id} className={styles.cartItem}>
                            <img
                                src={`https://pet-shop-backend-2l1c.onrender.com${item.image}`}
                                alt={item.title}
                            />

                            <div className={styles.itemInfo}>
                                <h3>{item.title}</h3>

                                <div className={styles.itemControls}>
                                    <div className={styles.quantityControl}>
                                        <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                                            +
                                        </button>
                                    </div>

                                    <div className={styles.priceBlock}>
                    <span className={styles.currentPrice}>
                      ${(item.discont_price || item.price) * item.quantity}
                    </span>
                                        {item.discont_price && (
                                            <span className={styles.oldPrice}>
                        ${item.price * item.quantity}
                      </span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className={styles.removeButton}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                <div className={styles.orderSummary}>
                    <h2>Order details</h2>

                    <div className={styles.summaryRow}>
                        <span>Items ({cartItems.length})</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    <div className={styles.totalRow}>
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    <form className={styles.orderForm}>
                        <input type="text" placeholder="Name" required />
                        <input type="tel" placeholder="Phone number" required />
                        <input type="email" placeholder="Email" required />
                        <button type="submit" className={styles.orderButton}>
                            Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CartPage;