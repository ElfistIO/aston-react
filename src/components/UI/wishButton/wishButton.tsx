import React from "react";
import { MATCH_SPACE } from "../../../helpers/constants";

interface Props {
  icon: string;
  action: (e: React.SyntheticEvent) => void;
}

function titleNameConvert(name: string) {
  return name
    .replace(MATCH_SPACE, " $1")
    .toLowerCase()
    .replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
}

export const WishButton = (props: Props) => {
  return (
    <button onClick={props.action} type="button">
      <i className="material-icons" title={titleNameConvert(props.action.name)}>
        {props.icon}
      </i>
    </button>
  );
};
