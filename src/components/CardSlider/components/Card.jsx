import { Col } from "react-bootstrap";
import styles from "./Card.module.scss";
import { useNavigate } from "react-router-dom";

const Card = ({ title, author="", imageUrl, onClick }) => {
  return (
    <Col onClick={onClick} xxl="4" xl="4" lg="4" md="4" xs="4" className={`${styles.card} mb-5 d-grid`}>
      <img src={imageUrl} alt="" className={`${styles.img} mb-2 w-100`}/>
      <p>{title}</p>
      <p>{author.title}</p>
    </Col>
  );
};

export default Card;
