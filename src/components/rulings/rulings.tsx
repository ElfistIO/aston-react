import { useEffect } from "react";
import { Ruling } from "scryfall-sdk";

import M from "materialize-css";

interface Props {
  rulings: Ruling[] | undefined;
}

export const Rulings = (props: Props) => {
  useEffect(() => M.AutoInit());
  return (
    <ul className="collapsible">
      {props.rulings?.map((ruling, index) => (
        <li key={index}>
          <div className="collapsible-header">
            <i className="material-icons">library_books</i>Rule №{index + 1} by{" "}
            {ruling.source.toUpperCase()}, published {ruling.published_at}
          </div>
          <div className="collapsible-body">
            <span>{ruling.comment}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
