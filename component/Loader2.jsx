import React from "react";
import styles from "../css/loader.module.css";

function Loader2() {
  return (
    <div className={styles.lds}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader2;
