import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';

function CategoriesPage() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('https://pet-shop-backend-2l1c.onrender.com/categories/all')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log('Ошибка:', error);
            });
    }, []);

    return (
        <div className={styles.categoriesPage}>
            <div className={styles.breadcrumbs}>
                <Link to="/">Main page</Link>
                <span> ... </span>
                <span>Categories</span>
            </div>

            <h1>Categories</h1>

            <div className={styles.categoriesGrid}>
                {categories.map(category => (
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
        </div>
    );
}

export default CategoriesPage;