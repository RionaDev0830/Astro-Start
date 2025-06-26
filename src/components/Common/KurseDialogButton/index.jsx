'use client'
import { useRef } from "react";
import styles from "./KurseDialogButton.module.css"
export default function CourseDialogButton({showOnDesktop = false}) {
    const dialogRef = useRef(null);

    return (
        <>
            <button className={`${styles.booktermin} ${showOnDesktop && styles.desktopOnly}`} onClick={() => dialogRef.current.showModal()}>Anleitung</button>
            <dialog className={styles.dialog} ref={dialogRef}>
                <button className={styles.closeBtn} onClick={() => dialogRef.current.close()}>X</button>
                <img src="/instructions.png" alt='instructions' fill />
            </dialog>
        </>
    )
}