"use client";

import { db } from "@/data/config";
import styles from "./styles.module.scss";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Link from "next/link"
const Showy = () => {
  const usersData = collection(db, "users");
  const productData = collection(db, "Products");

  const [users, setUsers] = useState([]);
  const [productList, setProductList] = useState([]);

  const fetchUsers = async () => {
    try {
      const querysnapshot = await getDocs(usersData);
      const usersList = querysnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const querysnapshotProducts = await getDocs(productData);
      const products = querysnapshotProducts.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductList(products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const showUserProducts = () => {
    if (users.length === 0) return null;
    if (!users[0].products) return null;
    return users[0].products.map((productId) => {
      const product = productList.find((item) => item.id === productId);
      if (!product) return null;
      return (
        <Link key={product.id} className={styles.product} href={`/product/${product.id}`}>
          <img src={product.imgs[0]} alt={product.title} />
          <div>
            <h3>
              {product.title.length > 70
                ? product.title.slice(0, 70) + "..."
                : product.title}
            </h3>
          <p>
            {product.descreption.length > 70? 
              product.descreption.slice(0, 70) + "..." : product.descreption}
          </p>
            <h3>{product.price}</h3>
          </div>
        </Link>
      );
    });
  };

  return <div className={styles.showy}>{showUserProducts()}</div>;
};

export { Showy };
