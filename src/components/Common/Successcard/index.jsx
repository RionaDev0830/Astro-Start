"use client";
import React from "react";
import styles from "./style.module.scss";


import animation from "./lf20_LrcfNr.json";

function SuccessCard({
  children,
  backgroundColor,
  title,
  msg,
  submitValue,
  setSubmitValue,
}) {
  const handleClick = (submitValue) => {
    setSubmitValue(!submitValue);
    window.location.reload();
  };
  return (
    <div className={styles.successcardcontainer}>
      <div className={styles.illustration}>
      </div>
      <h3>{title}</h3>
      <p>{msg}</p>
      <button
        style={{ background: backgroundColor }}
        onClick={() => handleClick(submitValue)}
      >
        {children}
      </button>
    </div>
  );
}

export default SuccessCard;
