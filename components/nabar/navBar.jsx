"use client";
import styles from "./stylex.module.scss";
import { useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";

const NavBar = () => {
  const [activeSearch, setActiveSearch] = useState(false);
  const handleSearchFocus = () => {
    setActiveSearch(true);
  };

  return (
    <nav className={styles.navbar}>
      <Link className={styles.logo} href="/">
        <img
          src="https://img.icons8.com/?size=100&id=80287&format=png&color=000000"
          alt="logo"
        />
      </Link>

      {/* <div className={styles.search}>
       {activeSearch && <div className={styles.active} onClick={()=>setActiveSearch(false)}></div>}
        <select name="" id="" onChange={handleSearchFocus}>
          <option value="all">all</option>
          <option value="electronics">electronics</option>
          <option value="home appliances">home appliances</option>
          <option value="vehicles">vehicles</option>
        </select>
        <input type="text" onFocus={handleSearchFocus}/>
       <Link href="/search">
        <img src="https://img.icons8.com/?size=100&id=132&format=png&color=000000" alt="" />
       </Link>
      </div> */}

      <div className={styles.language}>
        <select name="" id="">
          <option value="en">English</option>
          {/* <option value="ar">عربي</option> */}
        </select>
      </div>

      <Link className={styles.profile} href="/profile">
        <FaUserCircle className={styles.icon} />
      </Link>

      {/* <Link className={styles.returns} href="/returns">
        returns
      </Link> */}

      <Link className={styles.cart} href="/cart">
        <FaCartShopping className={styles.icon} />
      </Link>
    </nav>
  );
};

export default NavBar;
