import { Card } from "../../components/card/card";
import { CardInfo } from "../../components/cardInfo/cardinfo";
import { useLocation } from "react-router-dom";
import { SetInfo } from "../../components/setInfo/setInfo";

import * as Scry from "scryfall-sdk";
import s from "./cardPage.module.scss";
import { PrintInfo } from "../../components/printInfo/printInfo";

export const CardPage = () => {
  const location = useLocation();
  const card: Scry.Card = location.state as Scry.Card;

  return (
    <div className={s.main__wrapper}>
      <div className="container">
        <div className={s.main__cards}>
          <div className={s.main__card_wrapper}>
            <Card card={card} />
            <CardInfo card={card} />
            <div className={s.main__card_set}>
              <SetInfo card={card} />
              <PrintInfo card={card} />
            </div>
          </div>
        </div>
        <div>rulings</div>
      </div>
    </div>
  );
};
