import { Card } from "../../components/card/card";
import styles from "./searchResult.module.scss";

export const SearchResult = () => {
  return (
    <main className={styles.main__result}>
      <div className="container">
        <div className={styles.main__cards}>
          {/* {cards.map((card) => {
            <Card  />;
          })} */}
        </div>
      </div>
    </main>
  );
};
