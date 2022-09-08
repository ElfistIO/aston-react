import React from "react";

interface Props {
  icon: string;
  action: (e: React.SyntheticEvent) => void;
}

export const WishButton = (props: Props) => {
  return (
    <button onClick={props.action}>
      <i
        className="material-icons"
        title={props.action.name
          .replace(/([A-Z]+)/g, " $1")
          .replace(/([A-Z][a-z])/g, " $1")
          .toLowerCase()
          .replace(/\w/, (firstLetter) => firstLetter.toUpperCase())}
      >
        {props.icon}
      </i>
    </button>
  );
};
