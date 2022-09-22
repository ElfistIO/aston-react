import { Dispatch, SetStateAction } from "react";
import { Filter } from "../filter/filter";

import * as Scry from "scryfall-sdk";
import s from "./setHeader.module.scss";

interface Props {
  set: Scry.Set | undefined;
  setShowType: Dispatch<SetStateAction<string>>;
  setSortListBy: Dispatch<SetStateAction<string>>;
}

export const SetHeader = (props: Props) => {
  const { set, setShowType, setSortListBy } = props;

  return (
    <div className={s.setHeader__wrapper}>
      <div className="container">
        <div className={s.setHeader__info}>
          <div className={s.setHeader__info_box}>
            <img
              src={set?.icon_svg_uri}
              alt="set_icon"
              className={s.setHeader__icon}
            />
            <div className={s.setHeader__info_wrapper}>
              <div className={s.setHeader__info_name}>
                {set?.name} {`(${set?.code.toUpperCase()})`}
              </div>
              <div className={s.setHeader__info_block}>Block: {set?.block}</div>
              <div className={s.setHeader__info_card}>
                {set?.card_count.toString()} cards {`\u2022`} Released{" "}
                {set?.released_at}
              </div>
            </div>
          </div>
          <Filter setShowType={setShowType} setSortListBy={setSortListBy} />
        </div>
      </div>
    </div>
  );
};
