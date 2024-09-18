import Navbar from "/src/components/HeaderComponent/Navbar";
import Footer from "/src/components/Footer/Footer";
import BreadcrumbExample from "../BreadcrumbExample/BreadcrumbExample";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
    return (
      <>
        <Navbar />
          {/* Основной контент */}
          <main className={`flex-grow-1`}>
            <Container>
                <BreadcrumbExample />
                { children }
            </Container>
          </main>
          <Footer />
      </>
    );
  };
  
  export default Layout;