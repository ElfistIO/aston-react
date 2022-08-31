import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../UI/button/button";

import s from "./search.module.scss";

export const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const searchInput = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    navigate("/searchResult");
  }

  function handleClearInput(): void {
    setInputValue("");
  }

  useEffect((): void => {
    searchInput.current?.focus();
  }, []);

  return (
    <div className="row">
      <form
        className={"col s6 offset-s3 valign-wrapper"}
        onSubmit={handleSubmit}
      >
        <div className="input-field col s9">
          <input
            id="search"
            type="search"
            className={s.search__input}
            ref={searchInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <label className="label-icon" htmlFor="search">
            <i className="material-icons">search</i>
          </label>
          <i className="material-icons" onClick={handleClearInput}>
            close
          </i>
        </div>
        <div className="col s3 ">
          <Button color={"brown darken-3"} />
        </div>
      </form>
    </div>
  );
};
