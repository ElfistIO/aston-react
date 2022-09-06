import { useEffect, useState } from "react";
import { Card } from "scryfall-sdk";
import { Link } from "react-router-dom";

import * as Scry from "scryfall-sdk";
import s from "./printInfo.module.scss";

interface Props {
  card: Scry.Card | undefined;
}

export const PrintInfo = (props: Props) => {
  const [prints, setPrints] = useState<Card[]>();

  useEffect(() => {
    async function getPrints() {
      await props
        .card!.getPrints()
        .then((prints) => setPrints(prints))
        .catch(console.error);
    }
    getPrints();
  }, [props.card]);

  return (
    <>
      <div className={s.printInfo__head}>
        <div>prints</div>
        <div>usd</div>
      </div>
      <div className={s.printInfo__wrapper}>
        {prints?.map((print) => (
          <Link
            to={{ pathname: "/card", search: `id=${print?.id}` }}
            key={print.id}
          >
            <div className={s.printInfo__print}>
              <span>{print.set_name}</span>
              <span>{print.prices.usd}</span>
              <div className={s.printInfo__img_box}>
                <img
                  src={
                    props.card?.layout === "transform"
                      ? print.card_faces[0].image_uris?.png
                      : print.image_uris?.png
                  }
                  alt={`${props.card?.name}`}
                  className={s.printInfo__img}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
