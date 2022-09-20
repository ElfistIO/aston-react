import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "../../components/card/card";
import { CardInfo } from "../../components/cardInfo/cardinfo";
import { PrintInfo } from "../../components/printInfo/printInfo";
import { SetInfo } from "../../components/setInfo/setInfo";
import { Rulings } from "../../components/rulings/rulings";

import * as Scry from "scryfall-sdk";
import s from "./cardPage.module.scss";
import M from "materialize-css";

export const CardPage = () => {
  useEffect(() => M.AutoInit());
  const [card, setCard] = useState<Scry.Card>();
  const [rulings, setRulings] = useState<Scry.Ruling[]>();
  const [searchParams] = useSearchParams();
  const cardId = searchParams?.get("id");

  useEffect(() => {
    async function getCard() {
      await Scry.Cards.byId(cardId!)
        .then((card) => setCard(card))
        .catch(console.error);
    }
    getCard();
    async function getRulings() {
      await card?.getRulings().then((rulings) => setRulings(rulings));
    }
    getRulings();
  }, [card, cardId]);

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
        {!rulings?.length ? (
          <div>There's no rulings for this card.</div>
        ) : (
          <Rulings rulings={rulings} />
        )}
      </div>
    </div>
  );
};
