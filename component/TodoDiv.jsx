import React, { useState } from "react";
import cookieCutter from "cookie-cutter";

import styles from "../css/page.module.css";
import { BASE_URL } from "@/utils";
import Loader from "./Loader";

async function checkedAPI(id) {
  const user_token = cookieCutter.get("authKey");
  const date = new Date();
  
  const res = await fetch(`${BASE_URL}todos/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${user_token}`,
    },
    body: JSON.stringify({
      completed_at: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
      completed: true,
    }),
  });

  const result = await res.json();
  if (!res.ok) {
    return false;
  } else {
    return true;
  }
}

function TodoDiv({ isDelay, data, id, RemoveItem }) {
  const [cload, setcload] = useState(false);
  const [cdele, setcdele] = useState(false);

  const CompleteTodo = async (did) => {
    setcload(true);

    const res = await checkedAPI(did);
    if (res) {
      RemoveItem(id);
    }

    setcload(false);
  };
  return (
    <div className={styles.todoDivs}>
      {isDelay ? (
        <div className={styles.delayChip}>Delay</div>
      ) : (
        <div className={styles.nondelayChip}>&nbsp;</div>
      )}
      <h2>{data.title}</h2>
      <div className={styles.bottomRow}>
        <h4>{data.date_completed_by}</h4>
        {cload ? (
          <Loader />
        ) : (
          <input
            className={styles.checkbox}
            type="checkbox"
            onChange={(e) => {
              CompleteTodo(data.id);
            }}
          />
        )}

        <button
          title="Delete todo"
          onClick={() => RemoveItem(id)}
          className={styles.delete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
            className={styles.deleteSVg}
          >
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TodoDiv;
