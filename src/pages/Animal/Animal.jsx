import { Row, Col } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import Card from "../../components/CardSlider/components/Card";
import Layout from "../../components/Layout/Layout";
import styles from "./Animal.module.scss"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditAdmin from "../../components/EditAdmin/EditAdmin";
const Animal = () => {
  const [animalCard, setAnimalCard ] = useState({ habitat_area: [''] })
  console.log(animalCard)
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
        first: animalCard.international_name,
        second: animalCard.squad,
        third: animalCard.family
      };
    } else if (animalCard[key]) {
      // Для других полей, если они существуют в animalCard, добавляем их
      result[keyTranslations[key]] = animalCard[key];
    }
    return result;
  }, {});
  const {id} = useParams()
  const fetchUrl = `species/detail?id=${id}`
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
        setAnimalCard(data); // Устанавливаем данные, используя ключ dataKey
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  
  const handleNavigate = () => {

  }
    return (
      <Layout>
        <Row>
            <h1 className={styles.section__title}>{animalCard.title} <EditAdmin fetchUrl={"user/info"} url={"https://ecoton-backend.ivgpu.ru/admin/main/redbookspecies"}/></h1>
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
        <Row className="mb-5">
          <Col xxl="6" className={`${styles.map}`}>
          <div className="map" dangerouslySetInnerHTML={{ __html: animalCard.iframe_map }} />
          </Col>
          <Col xxl="6">
            <h2>Места обитания</h2>
            {Object.entries(animalCard.habitat_area).map(([key, value], index) => (
              <Accordion.Item 
                key={key} 
                className={`${styles.item} mt-5 mb-1`} 
                eventKey={key}
                onClick={() => handleNavigate(value.id)} // Используем value.id при клике
              >
                <Accordion.Header className={`${styles.header}`}>
                  {`${index + 1}. ${value.title || key}`} {/* Нумеруем элементы для отображения */}
                </Accordion.Header>
              </Accordion.Item>
            ))}
          </Col>
        </Row>
      </Layout>
    );
  };
  
  export default Animal;