"use client";
import React, { useState } from "react";
import styles from "./style.module.scss";
import commonstyles from "../common.module.scss";
import SuccessCard from "../Successcard";
import useContactStore from "../../../store/contactStore";

const ContactComponent = () => {
  const { contactData, setContactData, resetContactData } = useContactStore();
  const [submitValue, setSubmitValue] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetContactData();
  };

  return (
    <>
      <div className={styles.contactmaincontainer}>
        <div className={styles.contactcontainer}>
          {submitValue && (
            <SuccessCard
              title="Vielen Dank für Ihre Anfrage!"
              msg="Sie erhalten in kürze eine Rückmeldung von uns per Mail zugeschickt."
              backgroundColor=" #0697db"
              setSubmitValue={setSubmitValue}
              submitValue={submitValue}
            >
              Schliessen
            </SuccessCard>
          )}
          {!submitValue && (
            <form
              onSubmit={(e) => handleSubmit(e)}
              className={styles.contactformwrap}
            >
              <p>Geben Sie Ihre Kontaktdaten an</p>
              {contactData.category && contactData.abo && (
                <div className={styles.selectedPlan}>
                  <p>Ausgewählter Plan:</p>
                  <p>
                    {contactData.category} - {contactData.abo}
                  </p>
                </div>
              )}
              <input
                type="text"
                placeholder="Vorname und Nachname"
                value={contactData.name}
                onChange={(e) => setContactData({ name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Strasse / Nr."
                value={contactData.street}
                onChange={(e) => setContactData({ street: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="PLZ / Ort"
                value={contactData.place}
                onChange={(e) => setContactData({ place: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={contactData.email}
                onChange={(e) => setContactData({ email: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Telefon"
                value={contactData.phone}
                onChange={(e) => setContactData({ phone: e.target.value })}
                required
              />
              <textarea
                rows={4}
                placeholder="Nachricht"
                value={contactData.message}
                onChange={(e) => setContactData({ message: e.target.value })}
              />
              <button type="submit" className={commonstyles.btnstylefour}>
                Senden
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

// Add TypeScript global type definition
declare global {
  interface Window {
    setContactData?: (data: any) => void;
  }
}

export default ContactComponent;
