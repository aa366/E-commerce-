"use client"
import { useEffect } from "react";
import styles from "./styles.module.scss";

const Toast = ({ message, hide }) => {


  return (
  

    <div className={`${styles.toast} ${hide?styles.hide:""}`}> 
        
      {message}
    </div>
  );
};

export default Toast;