import React from "react";
import styles from "./Kursebody.module.css";

const Kursebody = ({ data }) => {
  return (
    <div className={styles.container}>
      {/* First section */}
      <div className={styles.first}>
        <h2 className={styles.title}>Kursbeschreibung</h2>
        <p className={styles.description}>{data.Beschreibung}</p>
      </div>

      {/* Second section */}
      <div className={styles.second}>
        <h2 className={styles.title}>Kursinformationen</h2>
        <div className={styles.infoBox}>
          <div className={styles.box}>
            <div className={styles.icon}>
              <img
                src={"/person_icon.svg"}
                alt="person icon"
                width={50}
                height={50}
              />
            </div>
            <div className={styles.text}>
              <h3>Teilnehmer</h3>
              <p>{data.Teilnehmer}</p>
            </div>
          </div>

          <div className={styles.box}>
            <div className={styles.icon}>
              <img
                src={"/location_icon_black.svg"}
                alt="person icon"
                width={50}
                height={50}
              />
            </div>
            <div className={styles.text}>
              <h3>Kursort</h3>
              <p>{data.Kursort}</p>
            </div>
          </div>

          <div className={styles.box}>
            <div className={styles.icon}>
              <img
                src={"/clock_icon.svg"}
                alt="person icon"
                width={50}
                height={50}
              />
            </div>
            <div className={styles.text}>
              <h3>Dauer</h3>
              <p>{data.Dauer}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Third section */}
      <div className={styles.third}>
        <h2 className={styles.title}>Inhalt</h2>
        <ul className={styles.contentList}>
          {data.Inhalt.map((el, i) => (
            <li key={i}>{el}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Kursebody;
