import { useParams } from "react-router-dom";
import CardList from "../../components/CardList/CardList";
import Layout from "../../components/Layout/Layout";
import styles from './Species.module.scss'

const ListSpecies = () => {
    const { id } = useParams();
    return (
        <Layout>
          <div className={styles.section}>
                <h1 className={styles.section__title}>Виды</h1>
                <CardList 
                    fetchUrl={`species/list?type=${id}`} 
                    dataKey="species" 
                    navigatePath={`{id}`}
                />
            </div>
        </Layout>
      );
  };
  
  export default ListSpecies;