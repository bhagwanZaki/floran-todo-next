"use client";

import React, { useEffect, useState } from "react";
import styles from "../../css/profile.module.css";
import ProfileChart from "@/component/ProfileChart";
import cookieCutter from "cookie-cutter";

import { BASE_URL } from "@/utils";
import Loader2 from "@/component/Loader2";

async function profileAPI() {
  const user_token = cookieCutter.get("authKey");

  const res = await fetch(`${BASE_URL}flutterchart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${user_token}`,
    },
  });

  const result = await res.json();
  console.log(result);
  if (!res.ok) {
    return {
      data: result.error,
      status: false,
    };
  } else {
    return {
      data: result,
      status: true,
    };
  }
}

function Page() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const cemail = cookieCutter.get("email");
    const cusername = cookieCutter.get("username");

    setEmail(cemail);
    setUsername(cusername);

    async function intialCall() {
      const res = await profileAPI();
      if (res.status) {
        setData(res.data);
      } else {
        setData({});
      }
      setLoading(false);
    }

    intialCall();
  }, []);

  const PrfCardGrp = ({ label, data }) => {
    return (
      <div className={styles.prfgrp}>
        <h4 className={styles.label}>{label}</h4>
        <h3 className={styles.text}>{data}</h3>
      </div>
    );
  };

  const RecordCard = ({ label, data }) => {
    return (
      <div className={styles.recordCard}>
        <h4>{label}</h4>
        <h3>{data}</h3>
      </div>
    );
  };

  return loading ? (
    <div className={styles.loadingDiv}>
      <Loader2 />
    </div>
  ) : (
    <main className={styles.main}>
      <button className={styles.logout}>Logout</button>
      <div className={styles.leftside}>
        <h3 className={styles.head}>User Profile</h3>
        <div className={styles.cardDiv}>
          <div className={styles.prfCard}>
            <PrfCardGrp label={"Username"} data={username} />
            <PrfCardGrp label={"Email"} data={email} />
          </div>
          <RecordCard
            label={"Number of task completed this month"}
            data={data.numberOfTaskDone}
          />
        </div>
      </div>
      <div className={styles.rightside}>
        <h2>Task Tracker</h2>
        <ProfileChart label={data.cdate} data={data.cdata} />
      </div>
    </main>
  );
}

export default Page;
