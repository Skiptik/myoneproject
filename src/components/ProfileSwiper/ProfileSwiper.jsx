import styles from "./ProfileSwiper.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../../components/CardSlider/components/Card"; // Import your Card component
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomButton from "../Button/ButtonCustom";

const ProfileSwiper = ({ title = "", data = [] }) => {
  const navigate = useNavigate(); // Properly declare useNavigate
  
  const handleCardClick = (id) => {
    console.log('Card clicked:', { id });
    navigate(`/animal/${id}`); // Navigate to the dynamic route for an animal
  };

  return (
    <>
      <Row>
      <h2 className={`${styles.title} d-flex justify-content-center`}>{title}</h2>
      </Row>
      <Row>
        {data.map((card, index) => (
          <Card
            onClick={() => handleCardClick(card.id)}
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
