import { Row, Col } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import Card from "../../components/CardSlider/components/Card";
import Layout from "../../components/Layout/Layout";
import styles from "./Animal.module.scss"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Animal = () => {
  const cardsData = [
    {
      title: "Заголовок 1",
      text: "Текст под заголовком 1",
      buttonText: "В коллекцию",
      imageUrl: "/src/assets/images/CardSlider/slide1.png",
    },
    {
      title: "Заголовок 2",
      text: "Текст под заголовком 2",
      buttonText: "В коллекцию",
      imageUrl: "/src/assets/images/CardSlider/slide2.png",
    },
    {
      title: "Заголовок 3",
      text: "Текст под заголовком 3",
      buttonText: "В коллекцию",
      imageUrl: "/src/assets/images/CardSlider/slide3.png",
    },
    // Добавьте больше карточек по мере необходимости
  ];
  const [animalCard, setAnimalCard ] = useState([])
  const keyTranslations = {
    taxonomy: "Классификация",
    status: "Статус",
    spreading: "Распространение",
    count: "Численность",
    habitat_features: "Особенности обитания",
    limit_features: "Лимитирующие факторы",
    protect_step: "Принятые меры охраны",
    state_change: "Изменения состояния вида",
    necessary_measures: "Необходимые мероприятия по сохранению вида",
    sources: "Источники информации",
    autor: "Автор",

  };
  const AnimalData = Object.keys(keyTranslations).reduce((result, key) => {
    // Для каждого ключа из keyTranslations проверяем наличие данных в animalCard
    if (key === "taxonomy") {
      // Специальная обработка taxonomy, так как это объект
      result[keyTranslations[key]] = {
        first: animalCard.descr_string_first,
        second: animalCard.descr_string_second,
        third: animalCard.descr_string_third
      };
    } else if (animalCard[key]) {
      // Для других полей, если они существуют в animalCard, добавляем их
      result[keyTranslations[key]] = animalCard[key];
    }
    return result;
  }, {});
  const {id_animal} = useParams()
  
  const fetchUrl = `species/detail?id=${id_animal}`
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
        setAnimalCard(data); // Устанавливаем данные, используя ключ dataKey
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
    return (
      <Layout>
        <Row>
            <h1 className={styles.section__title}>{animalCard.title}</h1>
        </Row>
        <Row className={`align-items-center`}>
          <Col xxl="6">
            <div className={`${styles.elipce}`}>
              <img src={`${animalCard.photo}`} alt="" className={`${styles.logo}`}/>
            </div>
          </Col>
          <Col xxl="6">
          <Accordion>
          {Object.keys(AnimalData).map((key) => (
          <Accordion.Item key={key} className={`${styles.item}`} eventKey={key}>
            <Accordion.Header className={`${styles.header}`}>
              {keyTranslations[key] || key} {/* Если нет перевода, используем оригинальный ключ */}
            </Accordion.Header>
            <Accordion.Body className={`${styles.body}`}>
              {/* Проверяем, является ли значение объектом */}
              {typeof AnimalData[key] === 'object' ? (
                Object.values(AnimalData[key]).map((value, index) => (
                  <p key={index}>{value}</p> // Выводим каждый элемент на новой строке
                ))
              ) : (
                <p>{AnimalData[key]}</p> // На случай если это не объект, а строка или число
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
          </Accordion>
          </Col>
        </Row>
        <Row>
          <Col xxl="6" className={`${styles.map}`}>
          <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae8bc61af4361e5d4f4f7f4338d67a53799734919c8500ef6ef38d8944002f76c&amp;source=constructor" width="612" height="523" frameborder="0"></iframe>
          </Col>
          <Col xxl="6">
            <h2>Места обитания</h2>
          </Col>
        </Row>
        <Row>
      {cardsData.map((card, index) => (
            <Card
              title={card.title}
              text={card.text}
              buttonText={card.buttonText}
              imageUrl={card.imageUrl}
            />
  
        ))}
      </Row>
      </Layout>
    );
  };
  
  export default Animal;