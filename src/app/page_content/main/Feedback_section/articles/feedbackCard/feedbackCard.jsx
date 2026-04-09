'use client';

import styles from "./feedbackCard.module.css";

export default function FeedbackCard({ cardData }) {

  console.log( cardData );
  

  return (
    <article className={styles.wrapper}>
      <p className={styles.person}>{cardData.name}, {cardData.age}</p>
      <p className={styles.text}>{cardData.text}</p>
    </article>
  );
}
