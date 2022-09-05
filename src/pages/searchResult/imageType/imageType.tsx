import { Card } from "../../../components/card/card";

import * as Scry from "scryfall-sdk";
import s from "./imageType.module.scss";

interface Props {
  cards: Array<Scry.Card>;
}

export const ImageType = ({ cards }: Props) => {
  return (
    <>
      {cards.length === 0 ? (
        <div className={s.main__empty}>
          Sorry, we didn't find anything for your request
        </div>
      ) : (
        <div className={s.main__cards}>
          {cards.map((card: Scry.Card) => (
            <Card card={card} key={card.id} />
          ))}
        </div>
      )}
    </>
  );
};
