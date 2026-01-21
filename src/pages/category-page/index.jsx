import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../../store/cartSlice';
import styles from './styles.module.css';

function CategoryPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState('');

    useEffect(() => {
        axios.get(`https://pet-shop-backend-2l1c.onrender.com/categories/${id}`)
            .then(response => {
                setCategoryTitle(response.data.category.title);
                setProducts(response.data.data);
            })
            .catch(error => {
                console.log('Ошибка:', error);
            });
    }, [id]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className={styles.categoryPage}>
            <div className={styles.breadcrumbs}>
                <Link to="/">Main page</Link>
                <span> ... </span>
                <Link to="/categories">Categories</Link>
                <span> ... </span>
                <span>{categoryTitle}</span>
            </div>

            <h1>{categoryTitle}</h1>

            <div className={styles.productsGrid}>
                {products.map(product => (
                    <div key={product.id} className={styles.productCard}>
                        <Link to={`/products/${product.id}`}>
                            <img
                                src={`https://pet-shop-backend-2l1c.onrender.com${product.image}`}
                                alt={product.title}
                            />
                        </Link>

                        {product.discont_price && (
                            <div className={styles.discount}>
                                -{Math.round((1 - product.discont_price / product.price) * 100)}%
                            </div>
                        )}

                        <div className={styles.productInfo}>
                            <Link to={`/products/${product.id}`}>
                                <h3>{product.title}</h3>
                            </Link>

                            <div className={styles.priceRow}>
                                <div className={styles.prices}>
                  <span className={styles.currentPrice}>
                    ${product.discont_price || product.price}
                  </span>
                                    {product.discont_price && (
                                        <span className={styles.oldPrice}>${product.price}</span>
                                    )}
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

export default CategoryPage;