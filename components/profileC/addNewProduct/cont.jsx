"use client";

import { IoClose } from "react-icons/io5";

import styles from "./styles.module.scss";

import { db } from "@/data/config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { useState, useEffect } from "react";

const Cont = ({ elementRef }) => {
  const usersData = collection(db, "users");
  const productData = collection(db, "Products");

  const [users, setUsers] = useState([]);
  
  const [addProductData, setAddProductData] = useState({
    title: "",
    price: "",
    banner: "",
    hashTags: [],
    imgs: [],
    productUID: "",
    date: "",
    descreption: "",
    userUID: "",
  });

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

      const productList = querysnapshotProducts.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error(error);
    }
  };

useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
       const userId = users.length > 0 ? users[0].id : "";
       const dateNow = Timestamp.now();

      setAddProductData((prev) => ({
        ...prev,
        userUID: userId,
        date : dateNow,
      }));
      const docRef = await addDoc(productData, addProductData);
      handleHideAddProduct();

       await updateDoc(doc(db, "Products", docRef.id), {
      productUID: docRef.id,
    });
    const newUserProduces = [...users[0].products,docRef.id,]
       await updateDoc(doc(db, "users", users[0].id), {
      products:newUserProduces ,
    });

     

    } catch (error) {
      console.error(error);
    }
  };
  const handleHideAddProduct = () => {
    if (elementRef && elementRef.current) {
      elementRef.current.classList.add("hide");
    }
};
const handleAddProductData = (e, id) => {
    const { value } = e.target;

    switch (id) {
      case "price":
        if (value < 0 || isNaN(value)) {
          setAddProductData((prev) => ({ ...prev, [id]: 0 }));
          e.target.value = 0;
          alert("please enter a valid number for price");
          break;
        }
        setAddProductData((prev) => ({ ...prev, [id]: value }));
        break;

      case "hashTags":
        const hashTagsArray = value
          .split(" ")
          .filter((tag) => tag.trim() !== "");
        setAddProductData((prev) => ({ ...prev, [id]: hashTagsArray }));

        break;

      case "imgs":
        const imgsArray = value.split(" ").filter((tag) => tag.trim() !== "");
        setAddProductData((prev) => ({ ...prev, [id]: imgsArray }));
        break;

      default:
        setAddProductData((prev) => ({ ...prev, [id]: value }));
        break;
    }
  };

  return (
    <div className={`${styles.addProductContaner} hide`} ref={elementRef}>
      <IoClose
        className={styles.addProductClose}
        onClick={handleHideAddProduct}
      />
      <div>
        <label htmlFor="addProductTitle">title</label>
        <input
          type="text"
          id="addProductTitle"
          onChange={(e) => {
            handleAddProductData(e, "title");
          }}
        />
      </div>
      <div>
        <label htmlFor="addProductPrice">price</label>
        <input
          type="number"
          id="addProductPrice"
          min="0"
          onChange={(e) => {
            handleAddProductData(e, "price");
          }}
        />
      </div>
      <div>
        <label htmlFor="addProductdescreptione">descreptione</label>
        <input
          type="text"
          id="addProductdescreptione"
          onChange={(e) => {
            handleAddProductData(e, "descreption");
          }}
        />
      </div>
      <div>
        <label htmlFor="addProductBanner">Banner</label>
        <input
          type="text"
          id="addProductBanner"
          onChange={(e) => {
            handleAddProductData(e, "banner");
          }}
        />
      </div>
      <div>
        <label htmlFor="addProductHashtags">HashTags</label>
        <input
          type="text"
          id="addProductHashtags"
          onChange={(e) => {
            handleAddProductData(e, "hashTags");
          }}
        />
      </div>
      <div>
        <label htmlFor="addProductimgs">imgs URL</label>
        <input
          type="text"
          id="addProductimgs"
          onChange={(e) => {
            handleAddProductData(e, "imgs");
          }}
        />
      </div>
      <div>
        <button onClick={handleHideAddProduct}>Cancel</button>
        <button onClick={handleAddProduct}>ADD</button>
      </div>
    </div>

  );
};

export { Cont };
