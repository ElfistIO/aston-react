import { Card } from "../../../components/card/card";
import { CardInfo } from "../../../components/cardInfo/cardinfo";
import { SetInfo } from "../../../components/setInfo/setInfo";

import * as Scry from "scryfall-sdk";
import s from "./Fulltype.module.scss";
import { PrintInfo } from "../../../components/printInfo/printInfo";

interface Props {
  cards: Array<Scry.Card> | undefined;
}

export const FullType = ({ cards }: Props) => {
  return (
    <>
      {cards?.length === 0 ? (
        <div className={s.main__empty}>
          Sorry, we didn't find anything for your request
        </div>
      ) : (
        <div className={s.main__cards}>
          {cards?.map((card: Scry.Card) => (
            <div className={s.main__card_wrapper} key={card.id}>
              <Card card={card} />
              <CardInfo card={card} />
              <div className={s.main__card_set}>
                <SetInfo card={card} />
                <PrintInfo card={card} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
