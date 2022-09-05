import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../UI/button/button";
import { useAppDispatch } from "../../app/hooks";
import {
  searchInputReducer,
  searchReducer,
} from "../../app/slices/searchSlice";
import { MagicArray } from "scryfall-sdk/out/util/MagicEmitter";

import * as Scry from "scryfall-sdk";
import s from "./search.module.scss";

export const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const searchInput = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function fetchSearch(search: string) {
    const result: MagicArray<Scry.Card, never> = await Scry.Cards.search(
      `name:${search}`
    ).waitForAll();
    dispatch(searchInputReducer(inputValue));
    dispatch(searchReducer(result));
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (inputValue === "") return;
    fetchSearch(inputValue);
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
          <Button color="brown darken-3" text="Search" />
        </div>
      </form>
    </div>
  );
};
