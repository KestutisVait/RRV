'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./introduction.module.css";
import Image from "next/image";
import { TfiShiftRightAlt } from "react-icons/tfi";

export default function Introduction() {

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/data/introduction.json`);
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
      fetchData();
  }, []);
  return (
    <article className={styles.wrapper}>
      {/* <Image className={styles.bg} src="/bg_introduction.svg" alt="hero" width="1930" height="678" /> */}
      <div className={styles.text_wrapper}>
        {Object.keys(data).length > 0 && 
          <>
            <p className={styles.greeting}>{data.greeting}</p>
            {data.pastraipa.map((item, index) => 
              <p key={index}>{item}</p>)
            } 
            {data.skills.map((item, index) => 
              <p key={index}>{item}</p>)
            } 
            <p className={styles.end}>{data.end}</p>
          </>
        }
        
      </div>
    </article>
  );
}
