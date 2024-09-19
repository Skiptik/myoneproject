import { Col, Container, Nav, Row } from "react-bootstrap";
import CustomButton from "/src/components/Button/ButtonCustom";
import styles from "./Third.module.scss"
import { useEffect, useState } from "react";
import Card from "../../../../components/CardList/components/Card/Card";
import { useNavigate } from "react-router-dom";

// Функция для перемешивания массива (алгоритм Фишера-Йетса)
const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Third = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = () => {
      Promise.all([
        fetch('https://ecoton-backend.ivgpu.ru/species/types'),
        fetch('https://ecoton-backend.ivgpu.ru/species/top_favorite'),
      ])
      .then(([response1, response2]) => Promise.all([response1.json(), response2.json()]))
        .then(([data1Response, data2Response]) => {
          // Устанавливаем данные и перемешиваем
        setData1(shuffleArray(data1Response["types"]).slice(0, 3)); // Берем только 3 случайных карточки
        setData2(data2Response["top_species"]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
    };
    console.log()
    fetchData(data1["types"]);
  }, []);
    return(
      <div className={`${styles.third}`}>
        <Container fluid="xxl" className="position-relative z-3">
          <Row className="justify-content-center">
            <Col xxl="7">
              <h1 className={`${styles.title}`}>Какие есть разделы</h1>
            </Col>
          </Row>
          <Row className={`${styles.cardlist}`}>
            {data1.map((card) => (
              <Card 
                key={card.id} // Используем уникальный идентификатор card.id для ключа
                title={card.title}
                text={card.text}
                buttonText={card.buttonText}
                bg={card.photo}
                onClick={() => { navigate(`/section/${card.id}`); }}
              />
            ))}
          </Row>

          <Row>
            <Col xxl="3">
              <CustomButton onClick={()=>navigate('/section')}>Все разделы</CustomButton>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xxl="8">
              <h1 className={`${styles.title}`}>Любимчики пользователей</h1>
            </Col>
          </Row>

          <Row className={`${styles.cardlist}`}>
            {data2.map((card) => (
              <Card 
                key={card.id} // Используем уникальный идентификатор card.id для ключа
                title={card.title}
                text={card.text}
                buttonText={card.buttonText}
                bg={card.photo}
                onClick={() => { navigate(`/animal/${card.id}`); }}
              />
            ))}
          </Row>
          <Row>
            <Col xxl="12">
              <Nav.Link href="tel:+74957777777" className={`${styles.banner}`}></Nav.Link>
            </Col>
          </Row>
        </Container>
      </div>
    )
}

export default Third;