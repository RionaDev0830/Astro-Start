"use client";
import { useState, useEffect } from "react";
import styles from "./Review.module.css";

export default function ReviewCarousel({reviews}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3); // Default is 3 cards

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 550) {
        setItemsToShow(1); // Show 1 card on mobile
      } else if (window.innerWidth <= 768) {
        setItemsToShow(2); // Show 2 cards on tablet
      } else {
        setItemsToShow(3); // Show 3 cards on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(0, reviews.length - itemsToShow)
        : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= reviews.length - itemsToShow ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      {/* Carousel section */}
      <div className={styles.carouselWrapper}>
        <div className={styles.leftbutton}>
          <button className={styles.arrowBtn} onClick={handlePrevClick}>
            <img
              src={"/arrow-left.svg"}
              alt="arrow left"
              width={20}
              height={20}
              className="w-[20px] h-[20px]"
            />
          </button>
        </div>
        <div className={styles.carouselContent}>
          {reviews
            .slice(currentIndex, currentIndex + itemsToShow)
            .map((review, index) => (
              <div key={index} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.textimg}>
                    <img
                      src={review.image}
                      alt={review.name}
                      width={30}
                      height={30}
                      className={styles.reviewImage}
                    />
                    <div>
                      <p className={styles.reviewName}>{review.name}</p>
                      <p className={styles.reviewDate}>{review.date}</p>
                    </div>
                  </div>
                  <img
                    src={review.googleimg}
                    alt="Google logo"
                    width={30}
                    height={30}
                    className={styles.googleimg}
                  />
                </div>
                <div className={styles.reviewStars}>
                  {"★".repeat(review.stars)}
                </div>
                <p className={styles.reviewText}>{review.text}</p>
              </div>
            ))}
        </div>
        <div className={styles.rightbutton}>
          <button className={styles.arrowBtn} onClick={handleNextClick}>
            <img
              src={"/arrow-right.svg"}
              alt="arrow right"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
