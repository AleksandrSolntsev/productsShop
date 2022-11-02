import React from "react";
import styles from "./ShopCard.module.css";

const ShopCard = (props) => {
  const title = props.title;
  const price = props.price;
  const thumbnail = props.thumbnail;
  return (
    <div className={styles.shopCard}>
      <div className={styles.productInfo}>
        <p>{title.charAt(0).toUpperCase() + title.slice(1)}</p>
        <img src={thumbnail} />
        <p>Price:</p>
        <p>{price}$</p>
      </div>
    </div>
  );
};

export default ShopCard;
