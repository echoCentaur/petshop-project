import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../../store/cartSlice';
import styles from './styles.module.css';

function ProductPage() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        axios.get(`https://pet-shop-backend-2l1c.onrender.com/products/${id}`)
            .then(response => {
                setProduct(response.data[0]);
            })
            .catch(error => {
                console.log('Ошибка:', error);
            });
    }, [id]);

    const handleAddToCart = () => {
        product && dispatch(addToCart({...product, quantity}));
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (!product) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.productPage}>
            {!product ? (
                <div className={styles.loading}>Loading...</div>
            ) : (
                <>
                    <div className={styles.breadcrumbs}>
                        <Link to="/">Main page</Link>
                        <span> - </span>
                        <Link to="/categories">Categories</Link>
                        <span> - </span>
                        <Link to={`/categories/${product.categoryId}`}>Category</Link>
                        <span> - </span>
                        <span>{product.title}</span>
                    </div>

                    <div className={styles.productContainer}>
                        {/* Левая часть - картинка */}
                        <div className={styles.imageSection}>
                            <img
                                src={`https://pet-shop-backend-2l1c.onrender.com${product.image}`}
                                alt={product.title}
                            />
                            {product.discont_price && (
                                <div className={styles.discount}>
                                    -{Math.round((1 - product.discont_price / product.price) * 100)}%
                                </div>
                            )}
                        </div>

                        {/* Правая часть - информация */}
                        <div className={styles.infoSection}>
                            <h1>{product.title}</h1>

                            <div className={styles.priceBlock}>
              <span className={styles.currentPrice}>
                ${product.discont_price || product.price}
              </span>
                                {product.discont_price && (
                                    <span className={styles.oldPrice}>${product.price}</span>
                                )}
                            </div>

                            <div className={styles.addToCartBlock}>
                                <div className={styles.quantityControl}>
                                    <button onClick={decreaseQuantity}>-</button>
                                    <span>{quantity}</span>
                                    <button onClick={increaseQuantity}>+</button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className={styles.addButton}
                                >
                                    Add to cart
                                </button>
                            </div>

                            <div className={styles.description}>
                                <h3>Description</h3>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
export default ProductPage;