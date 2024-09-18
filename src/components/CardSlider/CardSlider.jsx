import { useState, useEffect } from "react";
import styles from "./CardSlider.module.scss";
import Card from "./components/Card";
import slide1 from "../../assets/images/CardSlider/slide1.png";
import slide2 from "../../assets/images/CardSlider/slide2.png";
import slide3 from "../../assets/images/CardSlider/slide3.png";
import slide4 from "../../assets/images/CardSlider/slide4.png";

const CardSlider = () => {
  const cards = [
    {
      title: "Млекопетающие",
      text: "Класс позвоночных животных, основной отличительной особенностью которых является вскармливание детёнышей молоком.",
      buttonText: "подробнее",
      imageUrl: slide1,
    },
    {
      title: "Беcпозвоночные",
      text: "Многочисленная группа животных различных типов, лишённых позвоночника.",
      buttonText: "подробнее",
      imageUrl: slide2,
    },
    {
      title: "Птицы",
      text: "подробный текст 3",
      buttonText: "подробнее",
      imageUrl: slide3,
    },
    {
      title: "Рыбы",
      text: "подробный текст 4",
      buttonText: "подробнее",
      imageUrl: slide4,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const updateVisibleCards = () => {
    const width = window.innerWidth;
    if (width < 1080) {
      setVisibleCards(1); // Мобильные устройства
    } else if (width < 1440) {
      setVisibleCards(2); // Средние экраны
    } else {
      setVisibleCards(3); // Большие экраны
    }
  };

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  // Получаем карточки для отображения
  const displayedCards = Array.from({ length: visibleCards }, (_, i) => {
    const index = (currentIndex + i) % cards.length;
    return cards[index];
  });

  return (
    <div className={`${styles.cardSlider} d-flex justify-content-center`}>
      <button onClick={prevCard} className={`${styles.navigationButton} ${styles.navigationButtonLeft}`}>
      </button>
      <div className={`${styles.cardContainer} d-flex`}>
        {displayedCards.map((card, index) => (
          <div key={index} className={styles.cardWrapper}>
            <Card
              title={card.title}
              text={card.text}
              buttonText={card.buttonText}
              imageUrl={card.imageUrl}
            />
          </div>
        ))}
      </div>
      <button onClick={nextCard} className={`${styles.navigationButton} ${styles.navigationButtonRight}`}>
      </button>
    </div>
  );
};

export default CardSlider;