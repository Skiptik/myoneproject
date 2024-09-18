import Header from "./components/Header/Header";
import styles from "./Home.module.scss";
import Second from "./components/Second/Second";
import Third from "./components/Third/Third";
import Footer from "/src/components/Footer/Footer";
const Home = () => {
  return (
    <>
      <Header />
      {/* <div className={`${styles.pap1}`}></div> */}
      <div className={`${styles.pap2}`}></div>
      {/* Основной контент */}
      <main className={`${styles.bg} flex-grow-1`}>
        <Second />
        <Third />
      </main>
      <Footer />
    </>
  );
};

export default Home;
