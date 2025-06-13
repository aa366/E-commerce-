import React from "react";
import styles from "./style.module.scss";
import { FaArrowLeft , FaArrowRight} from "react-icons/fa";



const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <h1>Welcome to Our Store</h1>
        <p>Discover the best products at unbeatable prices!</p>
      </div>

      <div>
        <button value="prev">
<FaArrowLeft />
        </button>
        <button value="next">
<FaArrowRight />
        </button>

        <div>
            <img src="" alt="1" />
            <img src="" alt="2" />
            <img src="" alt="3" />
            <img src="" alt="4" />
        </div>

        <div className={styles.bannerControls}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          
        </div>

      </div>
    </div>
  );
};

export default Banner;
