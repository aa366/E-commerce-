"use client";
import { db } from "@/data/config";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Showy } from "@/components/profileC/displayer/showy";
import Link from "next/link";
export default function Home() {
  const productsCollection = collection(db, "Products");
  const [bannerProducts, setBannerProducts] = useState([]);
  const [current, setCurrent] = useState(0);

  const fetchProduct = async () => {
    try {
      const querySnapshot = await getDocs(productsCollection);
      const nowProducts = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((ele) => ele.banner && ele.banner.trim() !== "");
      setBannerProducts(nowProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? bannerProducts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === bannerProducts.length - 1 ? 0 : prev + 1));
  };

  const Banner = () => {
    if (!bannerProducts.length) return <div>Loading...</div>;
    const product = bannerProducts[current];
    return (
      <div className={styles.bannerCont}>
        <button onClick={handlePrev} aria-label="Previous">
          <FaArrowLeft className={styles.arrow} />
        </button>

        <Link href={`/product/${product.id}`} className={styles.imgMainCont}>
          <div className={styles.bannerImg}>
            <img src={product.banner} alt={product.title} />
          </div>
        </Link>

        <button onClick={handleNext} aria-label="Next">
          <FaArrowRight className={styles.arrow} />
        </button>

        <div className={styles.bannerControl}>
          {bannerProducts.map((_, idx) => (
            <span
              className={styles.span}
              key={idx}
              style={{
                background: idx === current ? "#333" : "#ccc",
              }}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Banner />
      <hr />
      <Showy />
    </div>
  );
}
