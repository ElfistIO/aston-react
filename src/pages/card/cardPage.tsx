import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "../../components/card/card";
import { CardInfo } from "../../components/cardInfo/cardinfo";
import { PrintInfo } from "../../components/printInfo/printInfo";
import { SetInfo } from "../../components/setInfo/setInfo";

import * as Scry from "scryfall-sdk";
import s from "./cardPage.module.scss";

export const CardPage = () => {
  const [card, setCard] = useState<Scry.Card>();
  const [searchParams] = useSearchParams();
  const cardId = searchParams.get("id");

  useEffect(() => {
    async function getCard() {
      await Scry.Cards.byId(cardId!)
        .then((card) => setCard(card))
        .catch(console.error);
    }
    getCard();
  }, [cardId]);

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
