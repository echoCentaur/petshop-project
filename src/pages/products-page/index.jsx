import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../../store/cartSlice';
import styles from './styles.module.css';

function ProductsPage() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [showDiscounted, setShowDiscounted] = useState(false);


    useEffect(() => {
        axios.get('https://pet-shop-backend-2l1c.onrender.com/products/all')
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data);
            })
            .catch(error => {
                console.log('Ошибка:', error);
            });
    }, []);


    useEffect(() => {
        const result = products
            .filter(p => !showDiscounted || p.discont_price)
            .filter(p => !priceFrom || (p.discont_price || p.price) >= Number(priceFrom))
            .filter(p => !priceTo || (p.discont_price || p.price) <= Number(priceTo))
            .sort((a, b) => {
                const priceA = a.discont_price || a.price;
                const priceB = b.discont_price || b.price;

                return sortBy === 'price-asc' ? priceA - priceB
                    : sortBy === 'price-desc' ? priceB - priceA
                        : sortBy === 'title' ? a.title.localeCompare(b.title)
                            : 0;
            });

        setFilteredProducts(result);
    }, [products, priceFrom, priceTo, sortBy, showDiscounted]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className={styles.productsPage}>
            <div className={styles.breadcrumbs}>
                <Link to="/">Main page</Link>
                <span> ... </span>
                <span>All products</span>
            </div>

            <h1>All products</h1>


            <div className={styles.filters}>
                <div className={styles.priceFilter}>
                    <label>Price</label>
                    <input
                        type="number"
                        placeholder="from"
                        value={priceFrom}
                        onChange={(e) => setPriceFrom(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="to"
                        value={priceTo}
                        onChange={(e) => setPriceTo(e.target.value)}
                    />
                </div>

                <div className={styles.discountFilter}>
                    <label>
                        <input
                            type="checkbox"
                            checked={showDiscounted}
                            onChange={(e) => setShowDiscounted(e.target.checked)}
                        />
                        Discounted items
                    </label>
                </div>

                <div className={styles.sortFilter}>
                    <label>Sorted</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="default">by default</option>
                        <option value="title">by title</option>
                        <option value="price-asc">by price: low to high</option>
                        <option value="price-desc">by price: high to low</option>
                    </select>
                </div>
            </div>

            <div className={styles.productsGrid}>
                {filteredProducts.map(product => (
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

            {filteredProducts.length === 0 && (
                <p className={styles.noProducts}>No products found</p>
            )}
        </div>
    );
}

export default ProductsPage;