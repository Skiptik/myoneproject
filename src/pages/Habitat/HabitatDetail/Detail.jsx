import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout/Layout';
import { Accordion, Col, Row } from 'react-bootstrap';
import styles from "./Detail.module.scss"
import Card from '../../../components/CardList/components/Card/Card';

const HabitatDetail = () => {
  const { id } = useParams(); // Получаем параметр id из URL
  const [habitatDetail, setHabitatDetail] = useState(null);
    const navigate = useNavigate()
  useEffect(() => {
    fetch(`https://ecoton-backend.ivgpu.ru/arias/detail?area_id=${id}`, { // Используем id в запросе
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
        setHabitatDetail(data["habitat_area"]); // Сохраняем детальные данные
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);

  if (!habitatDetail) {
    return <><Layout><div>Loading...</div></Layout></>; // Показать "загрузку", пока данные не получены
  }
  const handleClick = (id) =>{
    navigate(`/animal/${id}`, { replace: true })
  }
  const speciesArray = Object.entries(habitatDetail.species);
  const halfLength = Math.ceil(speciesArray.length / 2);
  const firstArray = speciesArray.slice(0, halfLength);
  const secondArray = speciesArray.slice(halfLength);
  return (
    <Layout>
      <h1 className={`${styles.section__title} mb-5`}>{habitatDetail.title}</h1>
      <Row>
        <Col xxl="6">
        <p>{habitatDetail.description}</p> {/* Пример отображения описания ареала */}
        </Col>
        <Col xxl="6">
        <p className="title">Карта распростронения</p>
        <div className="map" dangerouslySetInnerHTML={{ __html: habitatDetail.iframe_map }} />
        </Col>
      </Row>
      <Row className='mb-5'>
      <Col xxl="6" className="first-half">
    {firstArray.map(([key, value], index) => (
      <Accordion.Item 
          key={key} 
          className={`${styles.item} mt-5 mb-1`} 
          eventKey={key}
          onClick={() => handleClick(value.id)}  // Используем value.id при клике
        >
          <Accordion.Header className={`${styles.header}`}>
            {`${value.title || key}`} {/* Нумеруем элементы для отображения */}
          </Accordion.Header>
          {/* Здесь можно также отобразить Accordion.Body, если нужно */}
        </Accordion.Item>
    ))}
  </Col>
  
  <Col xxl="6" className="second-half">
    {secondArray.map(([key, value], index) => (
     <Accordion.Item 
     key={key} 
     className={`${styles.item} mt-5 mb-1`} 
     eventKey={key}
     onClick={() => handleClick(value.id)}  // Используем value.id при клике
   >
     <Accordion.Header className={`${styles.header}`}>
       {`${value.title || key}`} {/* Нумеруем элементы для отображения */}
     </Accordion.Header>
     {/* Здесь можно также отобразить Accordion.Body, если нужно */}
   </Accordion.Item>
    ))}
  </Col>
      </Row>
    </Layout>
  );
};

export default HabitatDetail;
