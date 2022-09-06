import { Link } from "react-router-dom";

import * as Scry from "scryfall-sdk";
import s from "./cardCheckList.module.scss";

interface Props {
  card: Scry.Card;
}

export const CardCheckList = (props: Props) => {
  const { card } = props;
  const img_uri =
    card.layout === "transform"
      ? card.card_faces[0].image_uris?.png
      : card.image_uris?.png;

  return (
    <Link to={{ pathname: "/card", search: `id=${card?.id}` }}>
      <div className={s.card__wrapper}>
        <div title={card.set_name}>{card.set.toUpperCase()}</div>
        <div className={s.card__collector_number}>{card.collector_number}</div>
        <div>{card.name}</div>
        <div className={s.card__mana_cost}>{card.mana_cost}</div>
        <div>{card.type_line}</div>
        <div className={s.card__rarity}>{card.rarity}</div>
        <div>{card.artist}</div>
        <div className={s.card__prices_usd}>{card.prices.usd}</div>
      </div>
      <div className={s.card__img_box}>
        <img src={img_uri} alt="card_image" className={s.card__img} />
      </div>
    </Link>
  );
};
