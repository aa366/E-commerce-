import React from 'react'
import styles from "./style.module.scss";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Shop</a></li>
        <li><a href="#">Categories</a></li>
        <li><a href="#">Deals</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;