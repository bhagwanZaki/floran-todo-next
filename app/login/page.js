"use client";

import React, { useEffect, useState } from "react";
import cookieCutter from "cookie-cutter";
import styles from "../../css/login.module.css";
import bgw from "../../imgs/logow.png";
import bgb from "../../imgs/logob.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils";
import { ToastContainer, toast } from "react-toastify";
import Loader from "@/component/Loader";

async function loginAPI(username, password, toast, router,setLoading) {
  const res = await fetch(`${BASE_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const result = await res.json();

  if (!res.ok) {
    setLoading(false)
    toast.error("Incorrect Credentials", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } else {
    cookieCutter.set("email", result.user.email);
    cookieCutter.set("username", result.user.username);
    cookieCutter.set("authKey", result.token);
    console.log("Routing you to main page");
    router.push("/");
  }
}

function Page() {
  const [theme, setTheme] = useState("dark");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (!darkThemeMq.matches) {
      setTheme("light");
    }
  }, []);

  const ShowPassword = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const SubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await loginAPI(username, password, toast, router,setLoading);
  };

  return (
    <section className={styles.section}>
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
      <div className={styles.formPart}>
        <h2>Login</h2>
        <form className={styles.form} onSubmit={(e) => SubmitForm(e)}>
          <div className={styles.grp}>
            <label className={styles.label} htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              className={styles.input}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.grp}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className={styles.input}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.showPasswordGrp}>
              <input type="checkbox" onClick={ShowPassword} /> Show Password
            </div>
          </div>
          {loading ? (
            <button className={styles.loadingBtn}>
              <Loader />
            </button>
          ) : (
            <input type="submit" className={styles.submit} value={"Login"} />
          )}
        </form>
        <Link href={"/register"} className={styles.link}>
          Don&apos;t Have An Account
        </Link>
      </div>
      <div className={styles.imgPart}>
        {theme === "dark" ? (
          <Image
            priority
            src={bgb}
            alt="Background image"
            className={styles.img}
          />
        ) : (
          <Image
            priority
            src={bgw}
            alt="Background image"
            className={styles.img}
          />
        )}
      </div>
    </section>
  );
}

export default Page;
