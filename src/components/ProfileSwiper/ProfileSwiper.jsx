import styles from "./ProfileSwiper.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../../components/CardSlider/components/Card"; // Импортируйте ваш компонент Card
import { Row } from "react-bootstrap";

const ProfileSwiper = ({title="", data=[]}) => {
  return (
    <>
      <h2 className={`${styles.title} d-flex justify-content-center`}>{title}</h2>
      <Row>
      {data.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          imageUrl={card.photo}
          author={card.specie}
        />
        ))}
      </Row>
    </>
  );
};

export default ProfileSwiper;
