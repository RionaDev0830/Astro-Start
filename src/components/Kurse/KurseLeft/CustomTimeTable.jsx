"use client";

import { useEffect, useState } from "react";
import styles from "./Kursebanner.module.scss";
const currentYear = new Date().getFullYear().toString().substring(2);
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function groupByMonth(data) {
  const groupedData = {
    title: "",
    months: {},
  };
  groupedData.title = data.name;

  data.schedule.forEach((item) => {
    const date = new Date(item.date);
    const month = date.toLocaleString("default", { month: "long" }); // Get full month name

    if (!groupedData.months[month]) {
      groupedData.months[month] = [];
    }
    groupedData.months[month].push(item);
  });

  return groupedData;
}

export default function CustomTable({ data }) {
  const eventId = data.EventId;
  const courseId = data.CourseId;
  const maxAttendences = Number(data.Teilnehmer.split(" ")[1]);

  const [activeMonth, setactiveMonth] = useState(new Date().getMonth());
  const [getSchedules, setGetSchedules] = useState(null);
  const [getcapacity, setGetcapacity] = useState(null);
  const [getbookings, setGetbookings] = useState(null);

  useEffect(() => {
    fetchBookings();
    fetchCapacity();
    fetchSchedules();
  }, []);

  const apikey = process.env.NEXT_PUBLIC_CALCOM_LICENSE_KEY;

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

  const fetchCapacity = async () => {
    const url = `https://api.cal.com/v2/event-types/${eventId}`;
    const headers = {
      "cal-api-version": "2024-06-14",
      Authorization: `Bearer ${apikey}`,
    };

    const resp = await fetchData(url, headers);
    setGetcapacity(resp.data.seats.seatsPerTimeSlot);
  };

  const fetchBookings = async () => {
    const url = `https://api.cal.com/v2/bookings?eventTypeId=${eventId}`;
    const headers = {
      "cal-api-version": "2024-06-14",
      Authorization: `Bearer ${apikey}`,
    };

    const resp = await fetchData(url, headers);
    setGetbookings(resp);
  };

  const fetchSchedules = async () => {
    const url = `https://api.cal.com/v2/schedules/${courseId}`;
    const headers = {
      Authorization: `Bearer ${apikey}`,
      "cal-api-version": "2024-06-11",
    };

    const resp = await fetchData(url, headers);

    // const groupedSchedules = groupByMonth(resp.data);
    setGetSchedules(resp.data);
  };

  if(!getSchedules) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p style={{ color: "#999" }}>Loading...</p>
      </div>
    );
  }

  return (
    <table className={styles.customTable}>
    {/* <thead>
        <tr>
          {months.map((month, index) => (
            <th
              key={index}
              className={
            activeMonth === months.indexOf(month) ? styles.activeMonth : ""
              }
              onClick={() => setactiveMonth(months.indexOf(month))}
            >{`${new Intl.DateTimeFormat("de-DE", {month: "short"}).format(new Date().setMonth(months.indexOf(month)))}. ${currentYear}`}</th>
          ))}
        </tr>
          </thead> */}
          <tbody>
        {getSchedules &&
          getSchedules.overrides
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .filter((schedule) => new Date(schedule.date) > new Date())
            .map((schedule, index) => (
              <>
            <tr key={index}>
              <td>
                <p>
                  {new Intl.DateTimeFormat("de-DE", {
                weekday: "long",
                  }).format(new Date(schedule.date))}
                </p>
                <a
                  data-cal-namespace={"nothelferkurs"}
                  data-cal-link="fahrschuleloyal/nothelferkurs"
                  data-cal-config={`{"layout":"month_view", "month": "${new Date(schedule.date).getFullYear()}-${String(new Date(schedule.date).getMonth() + 1).padStart(2, '0')}"}`}
                  href={""}
                  onClick={(e) => e.preventDefault()}
                >
                  <span style={{ display: "flex", gap: 5 }}>
                <img
                  src="https://www.svgrepo.com/show/499619/login.svg"
                  width={16}
                />
                zur Kursgruppe anmelden
                  </span>
                </a>
              </td>
              <td>
                {new Intl.DateTimeFormat("de-DE", "short").format(
                  new Date(schedule.date)
                )}
                <span>
                  {schedule.startTime} - {schedule.endTime}
                </span>
              </td>
              <td style={{flexGrow: 2, textAlign: "center"}}>Wählen sie einen der Standorte Schlieren, Dietikon oder Zürich</td>
              {/* Available in the Bookings */}
                  {/* <td>{booking.location}</td> */}
                  <td style={{fontWeight: "bolder"}}>
                    {getbookings &&
                      getbookings.data.bookings.filter(
                        (el) => el.eventType.id === eventId
                      ).length -
                        maxAttendences * -1}{" "}
                    freie Plätze verfügbar
                  </td>
                </tr>
              </>
            ))}
        {/* {getSchedules &&
          getSchedules.data.schedule.filter(
            (schedule) => new Date(schedule.date).getMonth() === activeMonth
          ).length === 0 && (
            <tr>
              <td
                colSpan={4}
                style={{
                  textAlign: "center",
                  color: "#ccc",
                  height: "100%",
                  alignSelf: "center",
                }}
              >
                Keine Buchungen f r diesen Monat
              </td>
            </tr>
          )} */}
      </tbody>
    </table>
  );
}
