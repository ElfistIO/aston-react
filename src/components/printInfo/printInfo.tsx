import { useCallback, useEffect, useState } from "react";
import { Card } from "scryfall-sdk";
import { Link } from "react-router-dom";

import * as Scry from "scryfall-sdk";
import s from "./printInfo.module.scss";

interface Props {
  card: Scry.Card;
}

export const PrintInfo = (props: Props) => {
  const [prints, setPrints] = useState<Card[]>();

  const getPrints = useCallback(async (): Promise<void> => {
    await props.card.getPrints().then((prints) => setPrints(prints));
  }, [props.card]);

  useEffect(() => {
    getPrints().catch(console.error);
  }, [getPrints]);

  return (
    <>
      <div className={s.printInfo__head}>
        <div>prints</div>
        <div>usd</div>
      </div>
      <div className={s.printInfo__wrapper}>
        {prints?.map((print) => (
          <Link to="/card" state={print} key={print.id}>
            <div className={s.printInfo__print}>
              <span>{print.set_name}</span>
              <span>{props.card.prices.usd}</span>
              <div className={s.printInfo__img_box}>
                <img
                  src={
                    props.card.layout === "transform"
                      ? props.card.card_faces[0].image_uris?.png
                      : props.card.image_uris?.png
                  }
                  alt={`${props.card.name}`}
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
