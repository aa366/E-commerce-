"use client";
import React from "react";
import { FaPen } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import styles from "./styles.module.scss";
import { db } from "@/data/config";
import { collection, getDocs, addDoc, deleteDoc ,updateDoc, doc} from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import {Cont} from "@/components/profileC/addNewProduct/cont";
import {Showy} from "@/components/profileC/displayer/showy";

const page = () => {
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
   const addProductRef = useRef(null);



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

     
      alert("Product added successfully");
    } catch (error) {
      console.error(error);
    }
  };
  const handleShowAddProduct = () => {
    addProductRef.current.classList.remove("hide");
  };
  

  const handleRemoveProduct = async () => {};
  const handleEditProduct = async () => {};
  const handleShowDraft = async () => {};

  return (
    <div className={styles.profileContainer}>
      
     <Cont elementRef={addProductRef}/>

      <div className={styles.bannerContainer}>
        <img src="/frontend deveolper.png" alt="" className={styles.banner} />

        <div className={styles.infosContainer}>
          <div className={styles.infos}>
            <div>
              <h3>Abdelwahab Anwr</h3>{" "}
              <button style={{display:"none"}}>
                <FaPen />
              </button>
            </div>
            <p>
              i am here to bulid the entire website as a practice feel free to
              get a tour , as frontend developer my mission is to make sure the
              website is good{" "}
            </p>
            <div className={styles.profileControll}>
              <button onClick={handleShowAddProduct}>Add</button>
              <button onClick={handleRemoveProduct}>Remove</button>
              <button onClick={handleEditProduct}>Edit</button>
              <button onClick={handleShowDraft}>drafts</button>
            </div>
          </div>
          <img src="/photo.jpg" alt="image" />
        </div>
      </div>
      <hr />
      <Showy />

    </div>
  );
};

export default page;
