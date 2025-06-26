"use client";
import React, { useEffect } from "react";
import styles from "./style.module.scss";
import { getCalApi } from "@calcom/embed-react";
import { useAtom } from "jotai";
import { openBtn } from "./store";

const Floaterbtn = () => {
  const [openbooking, setOpenBooking] = useAtom(openBtn);
  const handlebtn = () => {
    setOpenBooking(true);
  };

  const closebtn = () => {
    setOpenBooking(false);
  };

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "fahrpraxis-kategorie-b" });
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <>
      {openbooking ? (
        <div className={styles.popupcontainer}>
          <div className={styles.popupelem}>
            <div className={styles.servicewrap}>
              <div className={styles.popupmaintitle}>
                <h3>Fahrstunde direkt buchen</h3>
                <Image
                  src="/close-black.svg"
                  className={styles.maincloseicon}
                  alt="close"
                  height={30}
                  width={30}
                  onClick={closebtn}
                />
              </div>
              <div className={styles.servicetitlewrap}>
                <span>Kategorie B</span>
                <button
                  type="button"
                  className={styles.bookbtn}
                  data-cal-namespace="fahrpraxis-kategorie-b"
                  data-cal-link="fahrschuleloyal/fahrpraxis-kategorie-b"
                  data-cal-config='{"layout":"month_view"}'
                >
                  Termin finden
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button className={styles.btnstylefour} onClick={handlebtn}>
          Termin vereinbaren
        </button>
      )}
    </>
  );
};

export default Floaterbtn;
