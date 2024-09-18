import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout/Layout';
import { Accordion, Col, Row } from 'react-bootstrap';
import styles from "./Detail.module.scss"
import Card from '../../../components/CardList/components/Card/Card';
import EditAdmin from '../../../components/EditAdmin/EditAdmin';

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
      <Row>
        <h1 className={`${styles.section__title} mb-5`}>
          <>
          {habitatDetail.title}<EditAdmin fetchUrl="user/info" url={"https://ecoton-backend.ivgpu.ru/admin/main/habitatareas"}/>
          </> 
        </h1> 
      </Row> 
      <Row>
        <Col xxl="6">
        <p>{habitatDetail.description}</p> {/* Пример отображения описания ареала */}
        </Col>
        <Col xxl="6" className='mb-5'>
        <p className="title">Карта распростронения</p>
        <div className="map" dangerouslySetInnerHTML={{ __html: habitatDetail.iframe_map }} />
        </Col>
      </Row>
      <Row>
        <h3>Обитатели ареала</h3>
      </Row>
      <Row className='mb-5'>
      {firstArray.map(([key, value], index) => (
      <Col xxl="6" className="first-half d-flex align-items-center mb-3 text-wrap">
      <>
      <img src={value.photo} alt="" className={`${styles.img} me-2`}/>
      <Accordion.Item 
          key={key} 
          className={`${styles.item} mb-1`} 
          eventKey={key}
          onClick={() => handleClick(value.id)}  // Используем value.id при клике
        >
          <Accordion.Header className={`${styles.header}`}>
            {`${value.title || key}`} {/* Нумеруем элементы для отображения */}
          </Accordion.Header>
        </Accordion.Item>      
      </>
  </Col>
  ))}
  {secondArray.map(([key, value], index) => (
  <Col xxl="6" className="first-half d-flex align-items-center mb-3 text-wrap">
  <>
  <img src={value.photo} alt="" className={`${styles.img} me-2`}/>
  <Accordion.Item 
      key={key} 
      className={`${styles.item} mb-1`} 
      eventKey={key}
      onClick={() => handleClick(value.id)}  // Используем value.id при клике
    >
      <Accordion.Header className={`${styles.header}`}>
        {`${value.title || key}`} {/* Нумеруем элементы для отображения */}
      </Accordion.Header>
    </Accordion.Item>      
  </>
</Col>
    ))}
    </Row>
    </Layout>
  );
};

export default HabitatDetail;
