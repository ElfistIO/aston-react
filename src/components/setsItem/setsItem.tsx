import { Link } from "react-router-dom";

import * as Scry from "scryfall-sdk";
import s from "./setsItem.module.scss";

interface Props {
  set: Scry.Set;
}

export const SetsItem = (props: Props) => {
  return (
    <Link to={`/set?id=${props.set.id}`}>
      <div className={s.setsItem__wrapper}>
        <div className={s.setsItem__name}>
          <img
            src={props.set?.icon_svg_uri}
            alt="set_icon"
            className={s.setsItem__icon}
          />
          <div>{props.set.name}</div>
        </div>
        <div>{props.set.card_count}</div>
        <div>{props.set.released_at}</div>
      </div>
    </Link>
  );
};
