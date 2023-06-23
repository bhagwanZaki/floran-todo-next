"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Calendar from "react-calendar";
import cookieCutter from "cookie-cutter";
import { toast, ToastContainer } from "react-toastify";

import prf from "../imgs/prf.png";
import styles from "../css/page.module.css";
import { BASE_URL } from "@/utils";

import TodoDiv from "@/component/TodoDiv";
import Loader2 from "@/component/Loader2";
import Loader from "@/component/Loader";

export async function fetchTodoAPI(date) {
  const user_token = cookieCutter.get("authKey");
  var todayDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const res = await fetch(`${BASE_URL}ftodos/${todayDate}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${user_token}`,
    },
  });
  const result = await res.json();
  if (!res.ok) {
    return {
      data: result.error,
      status: false,
    };
  } else {
    return {
      data: result.todo,
      status: true,
    };
  }
}

async function createTodoAPI(date, title, desc) {
  const user_token = cookieCutter.get("authKey");
  const res = await fetch(`${BASE_URL}todos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${user_token}`,
    },
    body: JSON.stringify({
      title: title,
      description: desc,
      date_completed_by: date,
    }),
  });

  const result = await res.json();
  if (!res.ok) {
    return false;
  } else {
    return true;
  }
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [aloading, setaLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [idate, setidate] = useState(new Date());
  const [ititle, setititle] = useState("");
  const [itextarea, setitextarea] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    async function initialCall() {
      var date = new Date();
      const res = await fetchTodoAPI(date);
      if (res.status) {
        setData(res.data);
      } else {
        toast.warn(res.data, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setLoading(false);
    }

    initialCall();
  }, []);

  const OpenModal = () => {
    const dia = document.getElementById("formDialog");
    dia.showModal();
  };

  const CloseModal = () => {
    const dia = document.getElementById("formDialog");
    dia.close();
  };

  const CompareDate = (date) => {
    var givenDate = new Date(date);
    var todayDate = new Date();
    if (
      todayDate.getDate() <= givenDate.getDate() &&
      todayDate.getMonth() <= givenDate.getMonth() &&
      todayDate.getFullYear() <= givenDate.getFullYear()
    ) {
      return false;
    }

    return true;
  };

  const SubmitForm = async (e) => {
    e.preventDefault();
    setaLoading(true);
    const res = await createTodoAPI(idate, ititle, itextarea);
    setaLoading(false);
    if (res) {
      CloseModal();
      toast.success("New Todo Added", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      var todaysDate = new Date();
      await DateChange(todaysDate);
    } else {
      toast.warn("Something went wrong", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const DateChange = async (e) => {
    setLoading(true);
    setDate(e);
    const res = await fetchTodoAPI(e);
    if (res.status) {
      setData(res.data);
    } else {
      toast.warn(res.data, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setLoading(false);
  };

  const RemoveItem = (id) => {
    const updatedItems = [...data];
    updatedItems.splice(id, 1);
    setData(updatedItems);
  };

  return (
    <main className={styles.main}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Link className={styles.acct} href={"/profile"}>
        <Image src={prf} className={styles.prf} alt="Profile" />
      </Link>
      <dialog id="formDialog" className={styles.dialog}>
        <div className={styles.dialogContent}>
          <h3>Create New Todo</h3>
          <form className={styles.dform} onSubmit={(e) => SubmitForm(e)}>
            <div className={styles.grp}>
              <label htmlFor="date">Date :</label>
              <input
                id="date"
                required
                value={idate}
                onChange={(e) => setidate(e.target.value)}
                className={styles.dinput}
                type="date"
              />
            </div>
            <div className={styles.grp}>
              <label htmlFor="title">Title :</label>
              <input
                id="title"
                value={ititle}
                onChange={(e) => setititle(e.target.value)}
                className={styles.input}
                placeholder="Title"
                type="text"
                required
              />
            </div>
            <div className={styles.grp}>
              <label htmlFor="desc">Description :</label>
              <textarea
                id="desc"
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
            {aloading ? (
              <div className={styles.submit}>
                <Loader />
              </div>
            ) : (
              <input type="submit" value={"Add"} className={styles.submit} />
            )}
          </form>
        </div>

        <button className={styles.exit} onClick={CloseModal}>
          Exit
        </button>
      </dialog>
      <div className={styles.calendarSide}>
        <Calendar value={date} onChange={DateChange} />
      </div>
      <div className={styles.todoList}>
        <button
          title="Add new todo"
          onClick={OpenModal}
          className={styles.addBtn}
        >
          Add New Todo
        </button>
        {loading ? (
          <div className={styles.loaderDiv}>
            <Loader2 />
            <h3>Fetching Data..</h3>
          </div>
        ) : data.length === 0 ? (
          <div className={styles.loaderDiv}>
            <h3 className={styles.notodo}>
              Nothing to do? Sounds like the perfect time for a well-deserved
              break 😁.
            </h3>
          </div>
        ) : (
          <div className={styles.todoGrid}>
            {data.map((val, key) => {
              return (
                <TodoDiv
                  isDelay={CompareDate(val.date_completed_by)}
                  data={val}
                  key={key}
                  id={key}
                  RemoveItem={RemoveItem}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
