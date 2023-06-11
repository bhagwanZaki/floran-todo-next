import React from "react";
import styles from "../../css/profile.module.css";
import ProfileChart from "@/component/ProfileChart";
import Link from "next/link";

function page() {
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
  return (
    <main className={styles.main}>
      <button className={styles.logout}>
        Logout
      </button>
      <div className={styles.leftside}>
        <h3 className={styles.head}>User Profile</h3>
        <div className={styles.prfCard}>
          <PrfCardGrp label={"Username"} data={"Red_eye"} />
          <PrfCardGrp label={"Email"} data={"zaki.tarveen@gmail.com"} />
        </div>
        <div className={styles.btmdiv}>
          <RecordCard
            label={"Highest number of completed task in month"}
            data={"56,00,00"}
          />
          <RecordCard
            label={"Number of task completed this month"}
            data={"56,00,00"}
          />
        </div>
      </div>
      <div className={styles.rightside}>
        <h2>Task Tracker</h2>
        <ProfileChart />
      </div>
    </main>
  );
}

export default page;
