import { Row, Col, Container } from "react-bootstrap";
import styles from "./ProfileInfo.module.scss";
import profileImage from "../../assets/images/test-profile.jpg";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import ProfileSwiper from "../ProfileSwiper/ProfileSwiper";

const ProfileInfo = ({fetchUrl, dataKey = ""}) => {
  const [cardsData, setCardsData] = useState({});
  const token = Cookies.get('authToken');
  useEffect(() => {
    if (!fetchUrl) return;
      console.log(fetchUrl);
    fetch("https://ecoton-backend.ivgpu.ru/" + fetchUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data); // Отладочный вывод данных
        setCardsData(data[dataKey]); // Устанавливаем данные, используя ключ dataKey
        console.log('cardsData:', data[dataKey]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [fetchUrl, dataKey, token]);
  console.log(cardsData.favorites)
  return (
    <div className="styles.profileInfo">
      <div className="styles.profileInfo">
        <Row className={`d-flex ${styles.profileInfoContainer}`}>
          <Col xs={12} md={6}>
            <div className={`${styles.profileInfo__imageContainer}`}>
              <img
                className={styles.profileInfo__image}
                src={cardsData.photo}
                alt="Профиль"
                width={476}
                height={458}
              />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className={`${styles.profileInfo__infoContainer}`}>
              <p className={styles.profileInfo__text}>
              <span className={styles.profileInfo__surname}>
              {cardsData.first_name}
              </span>
              {' '}
              {cardsData.second_name}
              </p>
              <ul className={styles.profileInfo__infoList}>
                <li className={`d-flex ${styles.profileInfo__infoItem} mb-3`}>
                  <span className={styles.profileInfo__infoLabel}>
                    Статус
                  </span>
                  <span className={styles.profileInfo__infoValue}>{cardsData.role}</span>
                </li>
                <li className={`d-flex ${styles.profileInfo__infoItem} mb-3`}>
                  <span className={styles.profileInfo__infoLabel}>
                    eMail
                  </span>
                  <span className={styles.profileInfo__infoValue}>{cardsData.email}</span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <ProfileSwiper title={'Мои любимчики'} data={cardsData.favorites}></ProfileSwiper>
        </Row>
        <Row>
          <ProfileSwiper title={'Эко галлерея'} data={cardsData.user_gallery}></ProfileSwiper>
        </Row>
      </div>
    </div>
  );
};

export default ProfileInfo;
