import { Dispatch, SetStateAction, useEffect } from "react";
import { Dropdown } from "../UI/dropdown/dropdown";

import M from "materialize-css";
import s from "./filter.module.scss";

interface Props {
  setShowType: Dispatch<SetStateAction<string>>;
  setSortListBy: Dispatch<SetStateAction<string>>;
}

export const Filter = (props: Props) => {
  useEffect(() => M.AutoInit(), []);
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
          list={["name", "set", "rarity", "type"]}
          color={"brown darken-2"}
          action={props.setSortListBy}
        />
      </div>
    </div>
  );
};
