import { Card } from "../../../components/card/card";

import * as Scry from "scryfall-sdk";
import s from "./imageType.module.scss";

interface Props {
  cards: Array<Scry.Card> | undefined;
}

export const ImageType = ({ cards }: Props) => {
  return (
    <>
      {cards?.length === 0 ? (
        <div className="progress cyan lighten-1">
          <div className="indeterminate"></div>
        </div>
      ) : (
        <div className={s.main__cards}>
          {cards?.map((card: Scry.Card) => (
            <Card card={card} key={card.id} />
          ))}
        </div>
      )}
    </>
  );
};
