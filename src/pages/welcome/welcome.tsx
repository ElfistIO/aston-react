import { FC } from "react";
import { Search } from "../../components/search/search";

import styles from "./welcome.module.scss";

export const Welcome: FC = () => {
  return (
    <main className={styles.main__search}>
      <div className="container">
        <div className="row">
          <h4 className="col s10 offset-s1 center-align flow-text">
            <span className={styles.main__header_bold}>MTG Collection</span> is
            a powerful{" "}
            <span className={styles.main__header_bold}>
              Magic the Gathering
            </span>{" "}
            card search <br /> and digital collection of your real cards
          </h4>
        </div>
        <Search />
      </div>
    </main>
  );
};
