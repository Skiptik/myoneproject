import { Navbar } from "react-bootstrap";
import styles from "./Brand.module.scss"

const Brand = () => {
    return(
        <Navbar.Brand href="/" className={`${styles.logo} me-auto`}>MyApp</Navbar.Brand>
    )
}

export default Brand;