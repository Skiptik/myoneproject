import Layout from "../../components/Layout/Layout";
import CardList from "../../components/CardList/CardList"
import styles from "./Section.module.scss";

const Section = () => {
    return (
        <Layout>
            <div className={styles.section}>
                <h1 className={styles.section__title}>Разделы</h1>
                <CardList fetchUrl={`species/types`} dataKey="types" navigatePath={`/section/{id}`}/>
            </div>
        </Layout>
      );
  };
  
  export default Section;