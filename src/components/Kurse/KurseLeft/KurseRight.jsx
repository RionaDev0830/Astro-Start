"use client";
import React, { useEffect, useState } from "react";
import styles from "./Kursebanner.module.scss";
import { getCalApi } from "@calcom/embed-react";
import KurseDialogButton from '../../Common/KurseDialogButton/index.jsx';

const KurseRight = ({ data }) => {
  const [shownextCourse, setShownextCourse] = useState(true);
  const [getdates, setGetdates] = useState(null);
  const [getevents, setGetevents] = useState(null);
  const [getcapacity, setGetcapacity] = useState(null);
  const [getbookings, setGetbookings] = useState(null);
  const [standortchoice, setStandortchoice] = useState("dietikon");


  const apikey = process.env.NEXT_PUBLIC_CALCOM_LICENSE_KEY;

  const callink =
    data.Titel === "Nothelferkurse"
      ? "nothelferkurs"
      : data.Titel.toLowerCase();

  const courseid = ["CZV Ausbildung", "CZV Weiterbildung"].includes(data.Titel)
    ? ""
    : data.CourseId;

  const handlechoice = (e) => {
    setStandortchoice(e.target.value);
  };

  const extractCity = (address) => {
    const parts = address.split(", ");
    const lastPart = parts[1];
    if (!lastPart) return null;

    const city = lastPart.split(" ")[1];
    if (!city) return null;

    return city.toLowerCase() === "zürich" ? "zurich" : city.toLowerCase();
  };

  const fetchData = async (url, headers) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resp = await response.json();
      return resp;
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error(err);
      }
    }
  };

  const fetchSchedules = async () => {
    const url = `https://api.cal.com/v2/schedules/${courseid}`;
    const headers = {
      Authorization: `Bearer ${apikey}`,
    };

    const resp = await fetchData(url, headers);
    setGetdates(resp);
  };

  const fetchCapacity = async () => {
    const url = `https://api.cal.com/v2/event-types/${
      data.EventId ? data.EventId : ""
    }`;
    const headers = {
      "cal-api-version": "2024-06-14",
      Authorization: `Bearer ${apikey}`,
    };

    const resp = await fetchData(url, headers);
    setGetcapacity(resp.data.seats.seatsPerTimeSlot);
  };

  const fetchBookings = async () => {
    const url = `https://api.cal.com/v2/bookings?eventTypeId=${data.EventId}`;
    const headers = {
      "cal-api-version": "2024-06-14",
      Authorization: `Bearer ${apikey}`,
    };

    const resp = await fetchData(url, headers);
    setGetbookings(resp);
  };

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({
        namespace: callink,
      });
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
    if (!["CZV Ausbildung", "CZV Weiterbildung"].includes(data.Titel)) {
      fetchSchedules();
      fetchBookings();
      fetchCapacity();
    }
  }, []);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({
        namespace: callink,
      });
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
    if (!["CZV Ausbildung", "CZV Weiterbildung"].includes(data.Titel)) {
      fetchSchedules();
      fetchBookings();
      fetchCapacity();
    }
  }, [standortchoice]);

  return (
    <>
      <div className={styles.right}>
        <div className={!shownextCourse ? styles.sethide : ""}>
          <h2 className={styles.header}>Weitere Kurse</h2>
          <a
            href={"/nothelferkurs"}
            className={styles.course}
          >
            <img
              src="/Frame 10_shrink.webp"
              alt="Nothelferkurs"
              height={80}
              width={100}
              className={styles.courseImage}
            />
            <div className={styles.courseText}>
              <h3>Nothelferkurs</h3>
              <p>
                Dieser Kurs bietet Ihnen die notwendigen Kenntnisse und
                Fertigkeiten...
              </p>
            </div>
          </a>
          <a
            href={"/verkehrskunde"}
            className={styles.course}
          >
            <img
              src="/Frame 3.png"
              alt="Verkehrskunde"
              height={80}
              width={100}
              className={styles.courseImage}
            />
            <div className={styles.courseText}>
              <h3>Verkehrskunde</h3>
              <p>
                Der Verkehrskundekurs (VKU) vermittelt angehenden Fahrern...
              </p>
            </div>
          </a>
          <a
            href={"/czv-ausbildung"}
            className={styles.course}
          >
            <img
              src="/Frame 4.png"
              alt="CZV Ausbildung"
              height={80}
              width={100}
              className={styles.courseImage}
            />
            <div className={styles.courseText}>
              <h3>CZV Ausbildung</h3>
              <p>
                Die CZV-Ausbildung vermittelt Berufschauffeuren in der
                Schweiz...
              </p>
            </div>
          </a>
          <a
            href={"/czv-weiterbildung"}
            className={styles.course}
          >
            <img
              src="/Frame 5.png"
              alt="CZV Weiterbildung"
              height={80}
              width={100}
              className={styles.courseImage}
            />
            <div className={styles.courseText}>
              <h3>CZV Weiterbildung</h3>
              <p>
                Die CZV-Weiterbildung frischt alle fünf Jahre die
                Qualifikation...
              </p>
            </div>
          </a>
        </div>
        {data.Titel === "Verkehrskunde" &&  (
          <KurseDialogButton showOnDesktop={true} />
        )}
      </div>
    </>
  );
};

export default KurseRight;
