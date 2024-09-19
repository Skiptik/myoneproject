import { Accordion, Col, ListGroup, Row } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import styles from "./Habitat.module.scss"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../components/HeaderComponent/Search";
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
          <Col xxl="5">
          <h1 className={styles.section__title}>Ареал обитания</h1>
          </Col>
          <Col xxl="5"><Search placeholder="Поиск по кадастровому номеру" search="arias/list?kadastr=" keyData={"habitat_areas"}/></Col>
        </Row>
        <Row className="mb-5">
        {Object.entries(arealData).map(([key, value], index) => (
          <Col xxl="12">
            <Accordion.Item 
          key={key} 
          className={`${styles.item} mt-5 mb-1`} 
          eventKey={key}
          onClick={() => handleNavigate(value.id)} // Используем value.id при клике
        >
          <Accordion.Header className={`${styles.header}`}>
            <Col xxl="5">{`${index + 1}. ${value.title || key}`}</Col>
            <Col xxl="5"> {value.kadastr}</Col> {/* Нумеруем элементы для отображения */}
          </Accordion.Header>
        </Accordion.Item>
          </Col>
      ))}
      </Row>
      </Layout>
    );
  };
  
  export default Habitat;