import { Dispatch, SetStateAction, useEffect, useState } from "react";

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

  useEffect((): void => setDropText(dropText), [dropText]);

  return (
    <>
      <button
        className={`dropdown-trigger btn-small ${
          props.color ? props.color : "transparent"
        }`}
        data-target="dropList"
      >
        {dropText} <i className="material-icons">unfold_more</i>
      </button>
      <ul id="dropList" className="dropdown-content">
        {props.list.map((listItem, index) => (
          <li key={index}>
            <a
              href="#!"
              className={"blue-grey lighten-4"}
              onClick={() => toggleDropdown(listItem)}
            >
              {listItem}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
