import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../../store/cartSlice';
import styles from './styles.module.css';

function SalePage() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3333/products/all')
            .then(response => {
                // Фильтруем только товары со скидкой
                const discountedProducts = response.data.filter(p => p.discont_price);
                setProducts(discountedProducts);
            })
            .catch(error => {
                console.log('Ошибка:', error);
            });
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className={styles.salePage}>
            <div className={styles.breadcrumbs}>
                <Link to="/">Main page</Link>
                <span> - </span>
                <span>All sales</span>
            </div>

            <h1>Discounted items</h1>

            <div className={styles.productsGrid}>
                {products.map(product => (
                    <div key={product.id} className={styles.productCard}>
                        <Link to={`/products/${product.id}`}>
                            <img
                                src={`http://localhost:3333${product.image}`}
                                alt={product.title}
                            />
                        </Link>

                        <div className={styles.discount}>
                            -{Math.round((1 - product.discont_price / product.price) * 100)}%
                        </div>

                        <div className={styles.productInfo}>
                            <Link to={`/products/${product.id}`}>
                                <h3>{product.title}</h3>
                            </Link>

                            <div className={styles.priceRow}>
                                <div className={styles.prices}>
                  <span className={styles.currentPrice}>
                    ${product.discont_price}
                  </span>
                                    <span className={styles.oldPrice}>${product.price}</span>
                                </div>

                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className={styles.addButton}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SalePage;