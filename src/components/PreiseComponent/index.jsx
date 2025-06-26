"use client";
import React from "react";
import styles from "./Preise.module.css";
import { Cardsanim, Staggeranimstylethree } from "../Common/Transition/Cardsanim";
import PricingCards from "../PreiseCardsComponent/index";
import { basicCourses, pricingData } from '../../../data/pricing&Courses.json';

const  PreiseComponent = ({ h1, h2 }) => {
  // function to combine pricing data into main categories
  const combinePricingData = (pData) => {
    const combinedData = {};
    Object.keys(pData).forEach(key => {
      const item = pData[key];
      // exclude these categories from the combined data
      if(["Kontrollfahrt", "Taxi"].includes(item.category)) return;

      if (!combinedData[item.category]) {
        combinedData[item.category] = {
          title: `Kategorie ${item.category}`,
          mainCourses: [],
          basicCourses: []
        };
      }
      combinedData[item.category].mainCourses = [
        ...combinedData[item.category].mainCourses,
        ...item.mainCourses,
      ]
    });
    /* for (let i = 0; i < pData.length; i++) {
      const item = pData[i];
      // exclude these categories from the combined data
      if (["Kontrollfahrt", "Taxi"].includes(item.category)) {
        continue;
      }

      if (!combinedData[item.category]) {
        combinedData[item.category] = {
          title: `Kategorie ${item.category}`,
          mainCourses: [],
          basicCourses: []
        };
      }
      combinedData[item.category].mainCourses = [
        ...combinedData[item.category].mainCourses,
        ...item.mainCourses,
      ]
    } */
    return {
      ...combinedData,
      kurse: {
        title: "Kurse",
        mainCourses: [],
        basicCourses: basicCourses.filter(el => !el.type.startsWith("Versicherungsbeitrag"))
      }
    }
  }

  return (
    <Cardsanim klass={styles.card_container} staggerspeed={1}>
      {Object.values(combinePricingData(pricingData)).map(
        (category, index) => (
          <Staggeranimstylethree
            // klass={index % 2 === 0 ? styles.preise_card : styles.middle_preise_card}
            key={category.title}
            id={category.title.replace(" ", "")}
            viewspeed={1.7}
          >
            <div className={styles.category_group}>
              <h2 className={styles.category_title}>{category.title}</h2>
              <PricingCards
                key={index}
                pricingData={{ cards: [...category.mainCourses, ...category.basicCourses] }}
                overrideLink={"/kontakt"}
              />
            </div>
          </Staggeranimstylethree>
        )
      )}
    </Cardsanim>
  );
};

export default PreiseComponent;
