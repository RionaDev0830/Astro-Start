'use client'
import { useState } from "react";
import styles from "./crewSection.module.css"
import { motion } from "framer-motion";

export default function CrewSection({ data }) {
    const [collapse, setCollapse] = useState(true);

    if (data.kat !== "Kategorie C" && data.kat !== "Kategorie D") return null;
    const { newSection } = data;

    const toggleCollapse = () => {
        setCollapse(prev => !prev);
    };

    return (
        <div>
                <h3 className={styles.header} onClick={toggleCollapse} >
                    {newSection.header}
                    <span className={styles.moreinfo}>mehr Infos</span>
                    <img
                        src={"/arrow-down.svg"}
                        alt="arrow down"
                        width={15}
                        height={15}
                    />
                </h3>
            <motion.div
                layout
                style={{ height: collapse ? "0" : "auto" }}
            >
                <div className={styles.crewSection + " " + (collapse ? styles.collapsed : "")}>
                    <div className={styles.leftPanel}>
                        <p>{newSection.description[0]}</p>
                        <br />
                        <p>{newSection.description[1]}</p>
                        <ul className={styles.list}>
                            <h4>{newSection.prerequisite.title}:</h4>
                            {newSection.prerequisite.items.map((item, i) => (
                                <li key={i} style={{ listStyle: "inside none" }}>
                                    - {item}
                                </li>
                            ))}
                        </ul>
                        <ul className={styles.list}>
                            <h4>{newSection.duration.title}:</h4>
                            {newSection.duration.items.map((item, i) => (
                                <li key={i} style={{ listStyle: "inside none" }}>
                                    - {item}
                                </li>
                            ))}
                        </ul>
                        <ul className={styles.list}>
                            <h4>{newSection.cost.title}:</h4>
                            {newSection.cost.items.map((item, i) => (
                                <li key={i} style={{ listStyle: "inside none" }}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <ul className={styles.list}>
                            <h4>{newSection.miscs.title}:</h4>
                            {newSection.miscs.items.map((item, i) => (
                                <li key={i} style={{ listStyle: "inside none" }}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <strong className={styles.strong}>
                            Nehmen Sie mit uns Kontakt auf und wir planen gemeinsam Ihre
                            Ausbildung.
                        </strong>
                    </div>
                    <div className={styles.heroImage}>
                        <img src={newSection.heroImage.imgUrl} alt="crew member image" />
                        <h5>{newSection.heroImage.contactHeader}:</h5>
                        <label>{newSection.heroImage.contactPhone.label}: </label>
                        <a href={`tel:${newSection.heroImage.contactPhone.phoneNo}`}>
                            {newSection.heroImage.contactPhone.phoneNo}
                        </a>
                        <br />
                        <label>{newSection.heroImage.contactMail.label}: </label>
                        <a href={`mailto:${newSection.heroImage.contactMail.email}`}>
                            {newSection.heroImage.contactMail.email}
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
