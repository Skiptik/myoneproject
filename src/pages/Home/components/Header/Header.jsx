import NavbarComponent from "/src/components/HeaderComponent/Navbar";
import {Col, Container, Row} from 'react-bootstrap'
import styles from "./Header.module.scss"
import CustomButton from "/src/components/Button/ButtonCustom"
const Header = () => {
    return (
        <header className={`${styles.header}`} id="header">
            <NavbarComponent />
            <Container>
                <Row>
                    <Col xxl="12">
                        <h1 className={`${styles.title}`}>Эко Москва</h1>
                    </Col>
                </Row>
                <Row>
                    <p className={styles.subtitle}>Сервис "Красной книги Москвы" о редких видах региона: численность, распространение, условия обитания и меры сохранения. Узнайте о текущем состоянии и изменениях за период.</p>
                </Row>
                <Row className={`${styles.btn} ${styles.bg} z-3`}>
                    <Col xxl="3" lg="3" md="4" sm="6">
                       <CustomButton>Перейти в книгу</CustomButton>
                    </Col>
                </Row>
            </Container>
        </header>
    );
  }
  export default Header;
  