import { Container, Nav, Navbar } from "react-bootstrap";
import styles from './Footer.module.scss';
import NavCustom from "../HeaderComponent/Nav";
import Brand from "../HeaderComponent/Brand";
const Footer = () => {
    return(
        <footer className="bg-black">
          <Navbar className={styles.footerBlock} bg="black" data-bs-theme="black">
            <Container>
              <Brand />
              <NavCustom />
              <div className="d-flex flex-column">
                <Nav.Link>+7(495)777-77-77</Nav.Link>
                <Nav>
                <Nav.Link className="">
                    <i className={`${styles.icon} ${styles.vk}`}></i>
                  </Nav.Link>
                  <Nav.Link className="">
                    <i className={`${styles.icon} ${styles.telegram}`}></i>
                  </Nav.Link>
                  <Nav.Link className="">
                    <i className={`${styles.icon} ${styles.gmail}`}></i>
                  </Nav.Link>
                </Nav>
              </div>
            </Container>
        </Navbar>
      </footer>
    )
}

export default Footer;