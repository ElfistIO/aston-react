import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Filter } from "../../components/filter/filter";
import { ImageType } from "./imageType/imageType";
import { ChecklistType } from "./checklistType/checklistType";
import { FullType } from "./FullType/FullType";

import * as Scry from "scryfall-sdk";
import s from "./searchResult.module.scss";
import { MagicArray } from "scryfall-sdk/out/util/MagicEmitter";
import {
  setSearchInputState,
  setSearchState,
} from "../../app/slices/searchSlice";
import { useSearchParams } from "react-router-dom";

export const SearchResult = () => {
  const [showType, setShowType] = useState<string>("images");
  // сортировка пока не реализована. заготовка
  const [sortListBy, setSortListBy] = useState<string>("name");
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search");
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.searchResult.searchState);
  const searchInput = useAppSelector((state) => state.searchResult.searchInput);

  if (cards.length === 0) {
    async function fetchSearch(search: string) {
      const result: MagicArray<Scry.Card, never> = await Scry.Cards.search(
        `name:${search}`
      ).waitForAll();
      dispatch(setSearchInputState(searchValue!));
      dispatch(setSearchState(result));
    }
    fetchSearch(searchValue!);
  }

  function renderShowType(showType: string) {
    switch (showType) {
      case "images":
        return <ImageType cards={cards} />;
      case "checklist":
        return <ChecklistType cards={cards} />;
      case "full":
        return <FullType cards={cards} />;
      default:
        return <ImageType cards={cards} />;
    }
  }

  return (
    <main className={s.main__result}>
      <Filter setShowType={setShowType} setSortListBy={setSortListBy} />
      <div className={s.main__result_info}>
        <div className="container">
          <span>
            <strong>{cards.length} cards</strong> where the name includes "
            {searchInput}"
          </span>
        </div>
      </div>
      <div className="container">{renderShowType(showType)}</div>
    </main>
  );
};
