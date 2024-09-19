import { Navbar } from "react-bootstrap";
import styles from "./Brand.module.scss"
import { useNavigate } from "react-router-dom";

const Brand = () => {
    const navigate = useNavigate()
    return(
        <Navbar.Brand onClick={()=>{navigate("/")}} className={`${styles.logo} me-auto`}>MyApp</Navbar.Brand>
    )
}

export default Brand;