import { Link } from "react-router-dom";

import * as Scry from "scryfall-sdk";
import s from "./card.module.scss";

interface Props {
  card: Scry.Card;
}

export const Card = (props: Props) => {
  const card: Scry.Card = props.card;

  return (
    <Link to={"/card"} state={card}>
      <img
        src={
          card.layout === "transform"
            ? card.card_faces[0].image_uris?.png
            : card.image_uris?.png
        }
        alt={`${card.name}`}
        className={s.card__img}
      />
    </Link>
  );
};
