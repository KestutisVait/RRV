'use client';
import { useState, useEffect } from "react";
import styles from "./carousel.module.css";
import Card from "../card/card";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";
import { useProducts } from '@/context/ProductsContext'


export default function Carousell({ direction,  cardData, infoPageMode }) {

  const { setActiveCardIndex } = useProducts();
  const [ currentCard, setCurrentCard ] = useState(0);
  const flow = direction.toString();

  useEffect(() => {
    setActiveCardIndex(currentCard);
  }, [currentCard, setActiveCardIndex]);

  const nextCard = () => {
    setCurrentCard(prev => (prev === cardData.length - 1 ? 0 : prev + 1));
  };

  const prevCard = () => {
    setCurrentCard(prev => (prev === 0 ? cardData.length - 1 : prev - 1));
  };

  const nextIndex = currentCard === cardData.length - 1 ? 0 : currentCard + 1;  

  return (
    <div 
      className={styles.wrapper} 
      style={{ 
        flexDirection: flow === "right" ? "row-reverse" : "row",
        justifyContent: flow === "right" ? "end" : "start",
      }}
    >
      <div 
        className={styles.icon_wrapper}
        style={{
          transform : flow === "right" ? "translateX(50%)" : "translateX(-50%)",
          left: flow === "right" ? "100%" : "0px",
          visibility: cardData.length > 1 ? "visible" : "hidden",
        }}  
      >
        { flow === "right" ? 
          <CiCircleChevRight className={styles.icon_next} onClick={nextCard}/> :
          <CiCircleChevLeft className={styles.icon_back} onClick={prevCard}/>
        }
      </div>
      
      <div className={styles.card_wrapper}>
        { cardData.length > 0 && 
          cardData.map ((card, index) => (
            <div key={index} className={index === currentCard ? styles.active : ""}>
              <Card 
                poster={ card.poster} 
                price={ card.price} 
                shortInfo={ card.shortInfo} 
                pricePerHour={ card.pricePerHour} 
                handleInfoClick={infoPageMode}
              />
            </div>
          ))
        } 
      </div>
      <div 
        className={styles.icon_wrapper}
        style={{
          transform : flow === "right" ? "translateX(50%)" : "translateX(-50%)",
          left: flow === "right" ? "300px" : "45%",
          visibility: cardData.length > 1 ? "visible" : "hidden",

        }}  
      >
        { flow === "right" ? 
          <CiCircleChevLeft className={styles.icon_back} onClick={prevCard}/>:
          <CiCircleChevRight className={styles.icon_next} onClick={nextCard}/> 
        }
      </div>
      <div 
        className={styles.next_card_wrapper} 
        style={{  
          WebkitMaskImage: flow === "right" ? 
            "linear-gradient(to left, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 40%)" :
             "linear-gradient(to right, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 40%)",
          maskImage: flow === "right" ? 
            "linear-gradient(to left, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 40%)" :
            "linear-gradient(to right, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 40%)"
        }}
      >
        { cardData.length > 0 && 
          cardData.map ((card, index) => (
            <div key={index} className={index === nextIndex ? styles.active : ""}>
              <Card 
                poster={ card.poster} 
                price={ card.price} 
                shortInfo={ card.shortInfo} 
                pricePerHour={ card.pricePerHour} 
              />
            </div>
          ))
        } 
      </div>
    </div>
  );
}
