import { useEffect, useRef, useState } from "react";
import { Button } from "../UI/button/button";
import {
  useAppDispatch,
  useDebounceFunc,
  useNavigateSearch,
} from "../../app/hooks";
import {
  setSearchInputState,
  setSearchState,
} from "../../app/slices/searchSlice";
import { MagicArray } from "scryfall-sdk/out/util/MagicEmitter";

import * as Scry from "scryfall-sdk";
import s from "./search.module.scss";

export const Search = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);
  const searchInput = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigateSearch();
  const dispatch = useAppDispatch();

  async function fetchSearch(search: string) {
    const result: MagicArray<Scry.Card, never> = await Scry.Cards.search(
      `name:${search}`,
      { page: 1 }
    ).waitForAll();
    dispatch(setSearchInputState(inputValue));
    dispatch(setSearchState(result));
  }

  const searchWithDebounce = useDebounceFunc(
    (inputValue) => fetchSearch(inputValue),
    300
  );

  function handleSubmit(e: React.SyntheticEvent) {
    setIsLoadingState(true);
    e.preventDefault();
    if (!inputValue) {
      setIsLoadingState(false);
      return;
    }
    searchWithDebounce(inputValue);
    setIsLoadingState(false);
    navigate("/searchResult", { search: inputValue });
  }

  function handleClearInput(): void {
    setInputValue("");
  }

  useEffect((): void => {
    searchInput.current?.focus();
  }, []);

  return (
    <div className="row">
      {isLoadingState ? (
        <div className="progress cyan lighten-1">
          <div className="indeterminate"></div>
        </div>
      ) : (
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
      )}
    </div>
  );
};
