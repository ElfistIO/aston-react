import { CardCheckList } from "./../../../components/cardChecklist/cardCheckList";

import * as Scry from "scryfall-sdk";
import s from "./checklistType.module.scss";

interface Props {
  cards: Array<Scry.Card> | undefined;
}

export const ChecklistType = ({ cards }: Props) => {
  return (
    <>
      {cards?.length === 0 ? (
        <div className={s.main__empty}>
          Sorry, we didn't find anything for your request
        </div>
      ) : (
        <div className={s.main__cards}>
          <div className={s.card__wrapper}>
            <div>set</div>
            <div className={s.card__collector_number}>№</div>
            <div>name</div>
            <div className={s.card__mana_cost}>cost</div>
            <div>type</div>
            <div className={s.card__rarity}>rarity</div>
            <div>artist</div>
            <div className={s.card__prices_usd}>usd</div>
          </div>
          {cards?.map((card: Scry.Card) => (
            <CardCheckList card={card} key={card.id} />
          ))}
        </div>
      )}
    </>
  );
};
