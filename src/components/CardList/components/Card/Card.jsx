import { Col } from "react-bootstrap";
import styles from "./Card.module.scss";

const Card = ({ title, text, bg, onClick  }) => {
  return (
    <Col xxl='4' xl="4" md="4" lg="4" xs="6" className={`${styles.card}`} onClick={onClick}>
      <img src={bg} alt="" className={`${styles.bg}`} />
      <div className={`${styles.subCard} `}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subTitle}>{text}</p>
      </div>
    </Col>
  );
};

export default Card;
