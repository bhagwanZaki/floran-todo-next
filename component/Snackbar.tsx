import React from "react";
import styles from "../css/snackbar.module.css";

function Snackbar({ text, handleClose }) {
  return (
    <div className={styles.snackbar}>
      {text}
      <button className={styles.btn} onClick={handleClose}>
        X
      </button>
    </div>
  );
}

export default Snackbar;
