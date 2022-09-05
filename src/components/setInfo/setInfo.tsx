import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import s from "./setInfo.module.scss";
import * as Scry from "scryfall-sdk";

export const SetInfo = (props: { card: Scry.Card }) => {
  const card: Scry.Card = props.card;
  const [set, setSet] = useState<Scry.Set>();

  const getSet = useCallback(async (): Promise<void> => {
    await Scry.Sets.byName(card.set_name).then((set) => setSet(set));
  }, [card]);

  useEffect(() => {
    getSet().catch(console.error);
  }, [getSet]);

  return (
    <Link to="/set">
      <div className={s.set__wrapper}>
        <img src={set?.icon_svg_uri} alt="set_icon" className={s.set__icon} />
        <div className={s.set__info_wrapper}>
          <div className={s.set__info_name}>
            {set?.name} {`(${set?.code.toUpperCase()})`}
          </div>
          <div className={s.set__info_card}>
            #{card.collector_number} {`\u2022`} {card.rarity} {`\u2022`}{" "}
            {card.lang.toUpperCase()}
          </div>
        </div>
      </div>
    </Link>
  );
};
