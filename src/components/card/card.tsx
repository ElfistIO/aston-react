import { useRef } from "react";
import { Link } from "react-router-dom";

import * as Scry from "scryfall-sdk";
import s from "./card.module.scss";

interface Props {
  card: Scry.Card | undefined;
}

export const Card = (props: Props) => {
  const { card } = props;
  const refCard = useRef<HTMLDivElement | null>(null);

  function handleTransform(e: React.SyntheticEvent) {
    e.preventDefault();
    refCard.current?.classList.toggle(`${s.flip__card}`);
  }

  return (
    <Link to={{ pathname: "/card", search: `id=${card?.id}` }}>
      <div className={s.card__img_wrapper}>
        <div className={s.card__img_flip} ref={refCard}>
          {card?.layout === "normal" ? (
            <div className={s.card__img_front}>
              <img
                src={card.image_uris?.png}
                alt={`${card.name}`}
                className={s.card__img}
              />
            </div>
          ) : (
            <>
              <div className={s.card__img_front}>
                <img
                  src={card?.card_faces[0].image_uris?.png}
                  alt={`${card?.name}`}
                  className={s.card__img}
                />
                <button
                  className={s.card__img_transform}
                  onClick={handleTransform}
                >
                  <i className="material-icons">rotate_left</i>
                </button>
              </div>
              <div className={s.card__img_back}>
                <img
                  src={card?.card_faces[1].image_uris?.png}
                  alt={`${card?.name}`}
                  className={s.card__img}
                />
                <button
                  className={s.card__img_transform}
                  onClick={handleTransform}
                >
                  <i className="material-icons">rotate_left</i>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
