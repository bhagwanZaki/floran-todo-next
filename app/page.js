"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Calendar from "react-calendar";

import prf from "../imgs/prf.png";
import styles from "../css/page.module.css";

import TodoDiv from "@/component/TodoDiv";

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [idate, setidate] = useState(new Date());
  const [ititle, setititle] = useState("");
  const [itextarea, setitextarea] = useState("");

  const OpenModal = () => {
    const dia = document.getElementById("formDialog");
    dia.showModal();
  };

  const CloseModal = () => {
    const dia = document.getElementById("formDialog");
    dia.close();
  };
  return (
    <main className={styles.main}>
      <Link className={styles.acct} href={"/profile"}>
        <Image src={prf} className={styles.prf} alt="Profile" />
      </Link>
      <dialog id="formDialog" className={styles.dialog}>
        <div className={styles.dialogContent}>
          <h3>Create New Todo</h3>
          <form className={styles.dform} action="">
            <div className={styles.grp}>
              <label htmlFor="date">Date :</label>
              <input
                required
                value={idate}
                onChange={(e) => setidate(e.target.value)}
                className={styles.dinput}
                type="date"
              />
            </div>
            <div className={styles.grp}>
              <label htmlFor="date">Title :</label>
              <input
                value={ititle}
                onChange={(e) => setititle(e.target.value)}
                className={styles.input}
                placeholder="Title"
                type="text"
                required
              />
            </div>
            <div className={styles.grp}>
              <label htmlFor="date">Description :</label>
              <textarea
                value={itextarea}
                onChange={(e) => setitextarea(e.target.value)}
                required
                name="description"
                placeholder="Description"
                className={styles.input}
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <input type="submit" value={"Add"} className={styles.submit} />
          </form>
        </div>

        <button className={styles.exit} onClick={CloseModal}>
          Exit
        </button>
      </dialog>
      <div className={styles.calendarSide}>
        <Calendar value={date} onChange={setDate} />
      </div>
      <div className={styles.todoList}>
        <button onClick={OpenModal} className={styles.addBtn}>
          Add New Todo
        </button>
        <div className={styles.todoGrid}>
          
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
          <TodoDiv />
        </div>
      </div>
    </main>
  );
}
