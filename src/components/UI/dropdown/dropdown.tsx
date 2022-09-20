import { Dispatch, SetStateAction, useState } from "react";

import M from "materialize-css";

interface Props {
  list: Array<string>;
  color?: string;
  action: Dispatch<SetStateAction<string>>;
}

export const Dropdown = (props: Props) => {
  M.AutoInit();
  const [dropText, setDropText] = useState<string>(props.list[0]);

  function toggleDropdown(listItem: string) {
    setDropText(listItem);
    props.action(listItem);
  }

  return (
    <>
      <button
        className={`dropdown-trigger btn-small ${props.color || "transparent"}`}
        data-target={`dropList${props.list.at(0)}`}
        type="button"
      >
        {dropText} <i className="material-icons">unfold_more</i>
      </button>
      <ul id={`dropList${props.list.at(0)}`} className="dropdown-content">
        {props.list.map((listItem, index) => (
          <li key={index}>
            <button
              className={""}
              onClick={() => toggleDropdown(listItem)}
              type="button"
            >
              {listItem}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
