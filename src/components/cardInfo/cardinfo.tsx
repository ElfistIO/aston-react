import { Legality } from "../legality/legality";

import * as Scry from "scryfall-sdk";
import s from "./cardInfo.module.scss";

interface Props {
  card: Scry.Card | undefined;
}

export const CardInfo = (props: Props) => {
  const { card } = props;

  return (
    <>
      <div className={s.card__wrapper}>
        <div className={s.card__name_wrapper}>
          <div>{card?.name}</div>
          <div className={s.card__mana_cost}>{card?.mana_cost}</div>
        </div>
        <div className={s.card__type_line}>{card?.type_line}</div>
        <div className={s.card__text}>{card?.oracle_text}</div>
        <div className={s.card__artist}>Illustrated by {card?.artist}</div>
        <div className={s.card__legality_wrapper}>
          <Legality card={card} />
        </div>
      </div>
    </>
  );
};
