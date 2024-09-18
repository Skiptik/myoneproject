import { Col } from "react-bootstrap";
import styles from "./Card.module.scss";

const Card = ({ title, text="", buttonText="", imageUrl }) => {
  return (
    <Col xxl="4" xl="4" lg="4" md="4" xs="4" className={`${styles.card}`}>
      <img src={imageUrl} alt="" />
      <h2 className={`${styles.card__title}`}>{title}</h2>
      <p className={`${styles.card__text}`}>{text}</p>
      <button className={`${styles.card__button} d-flex`}>{buttonText}</button>
    </Col>
  );
};

export default Card;
