"use client";

import React, { useEffect, useState } from "react";
import cookieCutter from "cookie-cutter";
import styles from "../../css/register.module.css";
import bgw from "../../imgs/regw.png";
import bgb from "../../imgs/regb.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "@/utils";
import Loader from "@/component/Loader";

async function registerAPI(username, email, password, toast, router,setLoading) {
  const res = await fetch(`${BASE_URL}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  });
  const result = await res.json();
  console.log(result)
  if (!res.ok) {
    var error = "";
    if (result.hasOwnProperty("username")) {
      error = result.username[0];
    } else if (result.hasOwnProperty("email")) {
      error = result.email;
    }
    toast.error(error, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setLoading(false)
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
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
    var y = document.getElementById("Cpassword");
    if (x.type === "password") {
      x.type = "text";
      y.type = "text";
    } else {
      x.type = "password";
      y.type = "password";
    }
  };

  const SubmitForm = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      toast.error("Password Not Same", {
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
    setLoading(true);
    await registerAPI(username, email, password, toast, router,setLoading);
  };

  const notify = () => toast("Wow so easy!");

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
        <h2>Register</h2>
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
              placeholder="Jeffs Brown"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.grp}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className={styles.input}
              placeholder="jeffs@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          </div>
          <div className={styles.grp}>
            <label className={styles.label} htmlFor="password">
              Confirm Password
            </label>
            <input
              id="Cpassword"
              type="password"
              required
              className={styles.input}
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
            <div className={styles.showPasswordGrp}>
              <input type="checkbox" onClick={ShowPassword} /> Show Password
            </div>
          </div>
          {loading ? (
            <div className={styles.loadingBtn}>
              <Loader />
            </div>
          ) : (
            <input type="submit" className={styles.submit} value={"Register"} />
          )}
        </form>
        <Link href={"/login"} className={styles.link}>
          Already Have An Account
        </Link>
      </div>
      <div className={styles.imgPart}>
        {theme === "dark" ? (
          <Image src={bgb} alt="Background image" className={styles.img} />
        ) : (
          <Image src={bgw} alt="Background image" className={styles.img} />
        )}
      </div>
    </section>
  );
}

export default Page;
