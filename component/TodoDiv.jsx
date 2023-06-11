import React from "react";
import styles from "../css/page.module.css";

function TodoDiv() {
  return (
    <div className={styles.todoDivs}>
      <div className={styles.delayChip}>Delay</div>
      <h2>Something is pending, do it fast</h2>
      <div className={styles.bottomRow}>
        <h4>12-02-2002</h4>
        <input className={styles.checkbox} type="checkbox" />
      </div>
    </div>
  );
}

export default TodoDiv;
