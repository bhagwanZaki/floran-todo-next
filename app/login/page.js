"use client";

import React, { useEffect, useState } from "react";
import cookieCutter from "cookie-cutter";
import styles from "../../css/login.module.css";
import bgw from "../../imgs/logow.png";
import bgb from "../../imgs/logob.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function page() {
  const [theme, setTheme] = useState("dark");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const SubmitForm = (e) => {
    e.preventDefault();
    cookieCutter.set("authKey", "Logged in");
    router.push("/");
  };

  return (
    <section className={styles.section}>
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
          <input type="submit" className={styles.submit} value={"Login"} />
        </form>
        <Link href={"/"} className={styles.link}>
          Don't Have An Account
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

export default page;
