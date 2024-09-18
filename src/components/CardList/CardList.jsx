import styles from "./CardList.module.scss";
import { useState, useEffect } from "react";
import Card from "./components/Card/Card";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CardList = ({fetchUrl, dataKey = "", navigatePath = "/species"}) =>{
  const [cardsData, setCardsData] = useState([]); // Инициализация пустым массивом
  const navigate = useNavigate()

  useEffect(() => {
    if (!fetchUrl) return;
    fetch("https://ecoton-backend.ivgpu.ru/"+`${fetchUrl}`, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Отладочный вывод данных
        console.log(fetchUrl.dataKey)
        console.log(fetchUrl.navigatePath)
        setCardsData(data[dataKey]); // Устанавливаем данные, используя ключ dataKey
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [fetchUrl, dataKey, navigatePath]);

  const buildNavigatePath = (cardsData) => {
    let path = navigatePath;
    console.log("Card data:", cardsData); // Выводим объект для проверки

    // Заменяем плейсхолдеры в шаблоне пути на реальные значения из данных карточки
    Object.keys(cardsData).forEach((key) => {
      path = path.replace(`{${key}}`, cardsData[key]);
    });

    console.log("Generated path:", path); // Проверяем сформированный путь
    return path;
  };

  const handleClick = (cardsData) => {
    const fullPath = buildNavigatePath(cardsData); // Строим полный путь с динамическими параметрами
    console.log(fullPath)
    navigate(fullPath); // Переход на динамически построенный путь
  };

  return (
    <Row className={`${styles.cardList}`}>
      {Array.isArray(cardsData) && cardsData.map((card) => (
        <Card key={card.id} title={card.title} text={card.short_description} bg={card.photo} onClick={()=>handleClick(card)}/>
      ))}
    </Row>
  );
};


export default CardList;
