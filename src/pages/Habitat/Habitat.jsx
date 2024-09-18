import { Accordion, ListGroup, Row } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import styles from "./Habitat.module.scss"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Habitat = () => {
  const [arealData, setArealData] = useState('')
  const fetchUrl = `arias/list`
  const navigate = useNavigate()
  useEffect(() =>{
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
      setArealData(data.habitat_areas); // Устанавливаем данные, используя ключ dataKey
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);
  const handleNavigate = (key) => {
    navigate(`/habitat/${key}`); // Переход на страницу с деталями ареала
  };
    return (
      <Layout>
        <Row>
            <h1 className={styles.section__title}>Ареал обитания</h1>
        </Row>
        <Row className="mb-5">
        {Object.entries(arealData).map(([key, value], index) => (
        <Accordion.Item 
          key={key} 
          className={`${styles.item} mt-5 mb-1`} 
          eventKey={key}
          onClick={() => handleNavigate(value.id)} // Используем value.id при клике
        >
          <Accordion.Header className={`${styles.header}`}>
            {`${index + 1}. ${value.title || key}`} {/* Нумеруем элементы для отображения */}
          </Accordion.Header>
          {/* Здесь можно также отобразить Accordion.Body, если нужно */}
        </Accordion.Item>
      ))}
      </Row>
      </Layout>
    );
  };
  
  export default Habitat;