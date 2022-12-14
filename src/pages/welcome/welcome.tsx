import { useNavigate } from "react-router-dom";
import { FeaturedCards } from "../../components/featuredCards/featuredCards";
import { Search } from "../../components/search/search";

import * as Scry from "scryfall-sdk";
import s from "./welcome.module.scss";

export const Welcome = () => {
  const navigate = useNavigate();

  function navigateToSets() {
    navigate("/sets");
  }

  async function navigateToRandomCard() {
    const card = await Scry.Cards.random();
    navigate(`/card?id=${card.id}`);
  }

  return (
    <main className={s.main__search}>
      <div className={s.main__search_box}>
        <div className="container">
          <div className="row">
            <h4 className="col s10 offset-s1 center-align flow-text">
              <span className={s.main__header_bold}>HibernatioN</span> is a
              powerful{" "}
              <span className={s.main__header_bold}>Magic the Gathering</span>{" "}
              card search <br /> and network community of Magic players
            </h4>
          </div>
          <Search />
          <div className={s.main__buttons_box}>
            <button
              className="btn-small brown darken-3"
              onClick={navigateToSets}
              type="button"
            >
              all sets
            </button>
            <button
              className="btn-small brown darken-3"
              onClick={navigateToRandomCard}
              type="button"
            >
              random card
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <FeaturedCards />
      </div>
    </main>
  );
};
