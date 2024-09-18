import { Container, Row, Col, Button } from "react-bootstrap";
import styles from './Second.module.scss'
import { useNavigate } from "react-router-dom";

const Second = () => {
    const navigate = useNavigate()
    return(
        <>
        <div className={`${styles.img}`}></div>
        <Container className="d-flex z-3 position-relative">
            <div className={`${styles.secondBlock}`}>
                <Row className="d-flex flex-column align-content-xxl-end">
                    <Col xxl="5" className="">
                        <h1 className={`${styles.title}`}>Красная книга города Москвы</h1>
                    </Col>
                    <Col xxl="6" className="">
                        <div className={`${styles.subtitle}`}>
                        Красная книга города Москвы — официальный документ, содержащий сведения о состоянии редких, находящихся под угрозой исчезновения и уязвимых в условиях города Москвы видов животных и растений. В ней приведены данные об их распространении, численности, биотопической приуроченности, особенностях обитания в условиях города Москвы, лимитирующих факторах, мерах по сохранению или восстановлению на территории города Москвы, а также об изменениях в их состоянии (численности и распространении) за ревизионный период. В третье издание Красной книги города Москвы занесено 573 вида животных, растений и грибов, в том числе 128 видов сосудистых растений, 25 видов моховидных, 3 вида водорослей, 35 видов лишайников, 32 вида грибов, 24 вида млекопитающих, 88 видов птиц, 6 видов пресмыкающихся, 8 видов земноводных, 16 видов рыб и 208 таксонов беспозвоночных.
                        </div>
                    </Col>
                    <Col xxl="3" className="">
                    <Button onClick={()=>{navigate("/habitat")}} className={`${styles.btn}`}>Ареал обитания</Button>
                    </Col>
                </Row>
            </div>
        </Container>
        </>
    )
}

export default Second;