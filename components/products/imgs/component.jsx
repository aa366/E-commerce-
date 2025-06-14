"use client";
import { db } from "@/data/config";
import { getDoc, doc, collection,updateDoc, getDocs } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Toast from "@/components/toast/component"

const ImgsCont = () => {
  const id = useParams().id;
  const [productData, setProductData] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
   const [toast, setToast] = useState({ hide: true, message: "" });
 

  const fetchProduct = async () => {
    const productDataRaw = await getDoc(doc(db, "Products", id));
    if (!productDataRaw.exists()) {
      console.log("No such document!");
      return;
    }
    setProductData(productDataRaw.data());
    console.log(productDataRaw.data());
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
    // eslint-disable-next-line
  }, []);
  const showToast = (message) => {
    setToast({hide:false,
      message:message
   } )
   setTimeout(()=>{
  setToast({hide:true,
      message:""
   } )
   },1000)

   
  };
  const handleChangeImg = (index) => {
    setActiveIndex(index);
  };
  const copyText = (text) => {
    if (text) {
      navigator.clipboard.writeText(text);
      showToast("Copied")
    }
  };
  const handleAddToCart =async  ()=>{
    const usersDocs = await getDocs(collection(db, "users"))
    const user = usersDocs.docs[0].data()
    await updateDoc(doc(db,"users",user.id),{
      cart:[
      ...user.cart,productData.productUID
    ]})
    showToast("added to the cart successfully")
    console.log(user);
    
  }

  return (
    <div className={styles.mainCont}>

      <div className={styles.imgsCont}>
        <div>
          {productData.imgs && productData.imgs.length > 0 ? (
            productData.imgs.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt=""
                className={idx === activeIndex ? styles.active : ""}
                onClick={() => handleChangeImg(idx)}
              />
            ))
          ) : (
            <p>No images available.</p>
          )}
        </div>
        {productData.imgs && productData.imgs.length > 0 && (
          <img
            src={productData.imgs[activeIndex]}
            alt="Selected"
            className={styles.active}
          />
        )}
      </div>

      <div className={styles.infosCont}>
        <h1>{productData.title}</h1>
        <div
          className={styles.UID}
          onClick={() => {
            copyText(productData.productUID);
          }}
        >
          <label htmlFor="">UID</label>
          <h2>{productData.productUID}</h2>
        </div>

        <div className={styles.subCont}>
          <div>
            {Array.isArray(productData.hashTags) &&
              productData.hashTags.map((item) => (
                <span
                  onClick={() => {
                    copyText(item);
                  }}
                >
                  {item}
                </span>
              ))}
          </div>
          <h4>
            {productData.date && productData.date.toDate
              ? (() => {
                  const d = productData.date.toDate();
                  const day = String(d.getDate()).padStart(2, "0");
                  const month = String(d.getMonth() + 1).padStart(2, "0");
                  const year = d.getFullYear();
                  return `${day}/${month}/${year}`;
                })()
              : ""}
          </h4>
        </div>

        <p>{productData.descreption}</p>

        <div className={styles.priceCont}>
          <h2>${productData.price}</h2>
          <div>
            <Link href={`/product/purchase/${productData.productUID}`}>
              <button>Purshase</button>
            </Link>

            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
       <Toast 
         message={toast.message}
         hide = {toast.hide}/>
    </div>
  );
};

export default ImgsCont;
