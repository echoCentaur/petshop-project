import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';
import mainPageBanner from '../../assets/img/main-page-banner.png';

function MainPage() {
    const [categories, setCategories] = useState([]);
    const [sales, setSales] = useState([]);

    useEffect(() => {
        axios.get('https://pet-shop-backend-2l1c.onrender.com/categories/all')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log('Ошибка загрузки категорий:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('https://pet-shop-backend-2l1c.onrender.com/products/all')
            .then(response => {
                const discountedProducts = response.data.filter(p => p.discont_price);
                setSales(discountedProducts);
            })
            .catch(error => {
                console.log('Ошибка:', error);
            });
    }, []);

    return (
        <div className={styles.mainPage}>

            <div className={styles.banner} style={{backgroundImage: `url(${mainPageBanner})`}}>
                <div className={styles.bannerContent}>

                    <h1>Amazing Discounts on Pets Products!</h1>
                    <Link to="/sale" className={styles.bannerButton}>
                        Check out
                    </Link>
                </div>
            </div>


            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Categories</h2>
                    <Link to="/categories" className={styles.seeAll}>
                        All categories
                    </Link>
                </div>

                <div className={styles.categoriesGrid}>
                    {categories.slice(0, 4).map(category => (
                        <Link
                            to={`/categories/${category.id}`}
                            key={category.id}
                            className={styles.categoryCard}
                        >
                            <img
                                src={`https://pet-shop-backend-2l1c.onrender.com${category.image}`}
                                alt={category.title}
                            />
                            <h3>{category.title}</h3>
                        </Link>
                    ))}
                </div>
            </section>


            <div className={styles.discountBanner}>
                <h2>5% off on the first order</h2>
                <form className={styles.discountForm}>
                    <input type="text" placeholder="Name" />
                    <input type="tel" placeholder="Phone number" />
                    <input type="email" placeholder="Email" />
                    <button type="submit">Get a discount</button>
                </form>
            </div>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Sale</h2>
                    <Link to="/sale" className={styles.seeAll}>
                        All sales
                    </Link>
                </div>

                <div className={styles.categoriesGrid}>
                    {sales.slice(0, 4).map(sale => (
                        <Link
                            to={`/products/${sale.id}`}
                            key={sale.id}
                            className={styles.categoryCard}
                        >
                            <img
                                src={`https://pet-shop-backend-2l1c.onrender.com${sale.image}`}
                                alt={sale.title}
                            />

                            {sale.discont_price && (
                                <div className={styles.saleTag}>
                                    -{Math.round((1 - sale.discont_price / sale.price) * 100)}%
                                </div>
                            )}

                            <h3>{sale.title}</h3>

                            <div className={styles.salePrices}>
                                <span className={styles.newPrice}>${sale.discont_price}</span>
                                <span className={styles.oldPrice}>${sale.price}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>



        </div>
    );
}

export default MainPage;