import { Dispatch, SetStateAction } from "react";
import { Dropdown } from "../UI/dropdown/dropdown";

import M from "materialize-css";
import s from "./filter.module.scss";

interface Props {
  setShowType: Dispatch<SetStateAction<string>>;
  setSortListBy: Dispatch<SetStateAction<string>>;
}

export const Filter = (props: Props) => {
  M.AutoInit();
  return (
    <div className={s.filter__wrapper}>
      <div className="container">
        <span>Cards as</span>
        <Dropdown
          list={["images", "checklist", "full"]}
          color={"brown darken-2"}
          action={props.setShowType}
        />
        <span>sorted by</span>
        <Dropdown
          list={["name", "set", "rarity", "color"]}
          color={"brown darken-2"}
          action={props.setSortListBy}
        />
      </div>
    </div>
  );
};
