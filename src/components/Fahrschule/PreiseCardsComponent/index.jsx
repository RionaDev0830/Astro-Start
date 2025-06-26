"use client";
import styles from "./PreiseCards.module.css";
import useContactStore from "../../../store/contactStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect } from "react";

function getLastDayInTwoMonths() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 2; // zwei Monate weiter

  // Neues Datum für den 0. Tag des übernächsten Monats ergibt den letzten Tag des gewünschten Monats
  const lastDay = new Date(year, month + 1, 0);

  const monthNames = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];

  const day = lastDay.getDate();
  const monthName = monthNames[lastDay.getMonth()];
  const lastYear = lastDay.getFullYear();

  return `${day}. ${monthName} ${lastYear}`;
}

const PricingCards = ({
  pricingData,
  overrideLink = "",
  showBadge = true,
}) => {
  const setContactData = useContactStore((state) => state.setContactData);
  const resetContactData = useContactStore(state => state.resetContactData)

  // reset contact store data on new page
  useEffect(() => {
   resetContactData();
  }, [])

  const cardsLength = pricingData.cards.length;

  const handlePricingClick = (plan) => {
    // Store the selected plan info in Zustand
    setContactData({
      category: pricingData.title,
      abo: `${plan.type} - CHF ${plan.price} ${plan.suffix || ""}`,
    });
  };

  return (
    <div className={styles.container}>
      {pricingData.title && <h2>{pricingData.title}</h2>}
      {pricingData.subtitle && (
        <p>{pricingData.subtitle}</p>
      )}
      <div className={styles.cardsContainer}>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: cardsLength >= 3 ? 3 : cardsLength,
              spaceBetween: 10,
            },
          }}
        >
          {pricingData.cards.map((plan, index) => (
            <SwiperSlide key={index}>
              <div className={`${styles.card} ${styles[plan.variant]}`}>
                {showBadge && plan.multiplier && (
                  <div className={styles.multiplier}>{plan.multiplier}</div>
                )}
                <div className={styles.carImage}>
                  <img
                    src={plan.image_data.path}
                    alt="Driving school car"
                    width={plan.width}
                    height={plan.height}
                    className={`${styles.image}`}
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.type}>{plan.type}</h3>
                  <div className={styles.priceContainer}>
                    <div className={styles.price}>
                      <span className={styles.currency}>CHF </span>
                      {plan.price}.-
                    </div>
                    {plan.originalPrice && (
                      <div className={styles.originalPrice}>
                        <span className={styles.currency}>CHF </span>{" "}
                        {plan.originalPrice}.-
                      </div>
                    )}
                    {plan.type.includes("Kategorie") && (
                      <div className={styles.suffix}>{plan.suffix}</div>
                    )}
                    {!plan.type.includes("Aktion") && plan.details && (
                      <div className={styles.details}>{plan.details}</div>
                    )}
                    {plan.type.includes("Aktion") && plan.details && (
                      <div className={styles.details}>{plan.details} <br /> Aktion gültig bis {getLastDayInTwoMonths()}</div>
                    )}
                  </div>
                  {plan.type !== "Versicherungsbeitrag" && (
                    <a href={overrideLink || plan.actionLink}>
                      <button
                        className={styles.button}
                        onClick={() => handlePricingClick(plan)}
                      >
                        {plan.actionTitle}
                      </button>
                    </a>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PricingCards;
