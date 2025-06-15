"use client";
import { db } from "@/data/config";
import { IoClose } from "react-icons/io5";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Link from "next/link";
import {
  getDoc,
  doc,
  collection,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
//  title price quantity totalPrice

const page = () => {
  const usersCollection = collection(db, "users");

  const [user, setUser] = useState(null);
  const [cartProducts, setCartProducts] = useState(null);

  const fetchUser = async () => {
    const usersDocs = await getDocs(usersCollection);
    setUser(usersDocs.docs[0].data());
  };
  const fetchProduct = async () => {
    if (!user || !user.cart) return;

    const productDocs = await Promise.all(
      user.cart.map((id) => getDoc(doc(db, "Products", id)))
    );
    setCartProducts(productDocs.map((docSnap) => docSnap.data()));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProduct();
    }
  }, [user]);

  function ProductItem({ item }) {
    const [quantity, setQuantity] = useState(1);
    const handleClick = () => {
      updateDoc(doc(db, "users", user.id), {
        ...user,
        cart: user.cart.filter((ele) => ele !== item.productUID),
      });
      setQuantity(0);
    };
    const handleQuantity = (states) => {
      if (states == "up") {
        setQuantity((prev) => prev + 1);
      } else if (states == "down") {
        if (quantity == 1) {
          return;
        }
        setQuantity((prev) => prev - 1);
      }
    };

    return (
      <>
        <div className={styles.itemCont} key={item.productUID + "R"}>
          <img src={item.banner ? item.banner : item.imgs[0]} alt="" />
          <h2>
            {item.title.length > 20
              ? item.title.slice(0, 20) + "..."
              : item.title}
          </h2>
          <h3>${item.price}</h3>
          <h3 className={styles.quantity}>
            {quantity}
            <div className={styles.arrowCont}>
              <FaArrowUp
                className={styles.arrow}
                onClick={() => {
                  handleQuantity("up");
                }}
              />
              <FaArrowDown
                className={styles.arrow}
                onClick={() => {
                  handleQuantity("down");
                }}
              />
            </div>
          </h3>
          <h3>${quantity * Number(item.price)}</h3>
          <IoClose className={styles.end} onClick={handleClick} />
        </div>
      </>
    );
  }
  const Operations = () => {
    const handleClick = () => {
      updateDoc(doc(db, "users", user.id), {
        ...user,
        cart: [],
      });
    };

    return (
      <div className={styles.operations}>
        <button onClick={handleClick}>delete all </button>

        <Link href={`/purchase/cart`}>
          <button>purchase</button>
        </Link>
      </div>
    );
  };

  const Products = () => (
    <div className={styles.productsCont}>
      {cartProducts &&
        cartProducts.map((item) => (
          <ProductItem key={item.productUID + "R"} item={item} />
        ))}

      <Operations />
    </div>
  );

  return (
    <div className={styles.mainCont}>
      <Products />
    </div>
  );
};

export default page;
 