import { useCallback, useEffect, useState } from "react";
import { Card } from "scryfall-sdk";
import { Link } from "react-router-dom";

import s from "./printInfo.module.scss";
import * as Scry from "scryfall-sdk";

interface Props {
  card: Card | undefined;
}

export const PrintInfo = (props: Props) => {
  const card = props.card;
  const [prints, setPrints] = useState<Card[]>();
  const [isLoading, setIsLoading] = useState<boolean>();

  const getPrints = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    if (card) {
      const tempCard = await Scry.Cards.byId(card.id);
      const prints = await tempCard.getPrints();
      setPrints(prints);
    }
    setIsLoading(false);
  }, [card]);

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
        {isLoading ? (
          <div className={s.printInfo__preloader}>
            <div className="preloader-wrapper small active">
              <div className="spinner-layer spinner-green-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          prints?.map((print) => (
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
          ))
        )}
      </div>
    </>
  );
};
