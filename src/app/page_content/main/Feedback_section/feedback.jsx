'use client';
import { useState } from "react";
import styles from "../main.module.css";
import feedbackStyles from './feedback.module.css';
import FeedbackCard from "./articles/feedbackCard/feedbackCard";
import { useFeedback } from "@/context/FeedbackContext";

export default function FeedbackSection({ id, index }) {

  const { dataFeedback } = useFeedback();

  if (!dataFeedback || dataFeedback.length === 0) return <p>Loading...</p>;

  return (
    <section
      id={id} 
      className={`${styles.section} ${feedbackStyles.wrapper}`}
      data-section={index}
    >
      {dataFeedback.map((card, index) =>
        <FeedbackCard key={index} cardData={card} />
      )}
    </section>
  );
}
