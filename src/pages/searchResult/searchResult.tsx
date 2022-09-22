import { SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Filter } from "../../components/filter/filter";
import { ImageType } from "./imageType/imageType";
import { ChecklistType } from "./checklistType/checklistType";
import { FullType } from "./FullType/FullType";
import { MagicArray } from "scryfall-sdk/out/util/MagicEmitter";
import {
  setSearchInputState,
  setSearchSort,
  setSearchState,
} from "../../app/slices/searchSlice";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "../../components/pagination/pagination";

import * as Scry from "scryfall-sdk";
import s from "./searchResult.module.scss";

export const SearchResult = () => {
  const [showType, setShowType] = useState<string>("images");
  const [sortListBy, setSortListBy] = useState<string>("name");
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search");
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.searchResult.searchState);
  const searchInput = useAppSelector((state) => state.searchResult.searchInput);
  const [currentPage, setCurrentPage] = useState(1);
  const CARDS_PER_PAGE = 20;
  const indexOfLastCard = currentPage * CARDS_PER_PAGE;
  const indexOfFirstCard = indexOfLastCard - CARDS_PER_PAGE;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  const paginate = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

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
        return <ImageType cards={currentCards} />;
      case "checklist":
        return <ChecklistType cards={currentCards} />;
      case "full":
        return <FullType cards={currentCards} />;
      default:
        return <ImageType cards={currentCards} />;
    }
  }

  useEffect(() => {
    dispatch(setSearchSort(sortListBy));
  }, [dispatch, sortListBy]);

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
      <div className="container">
        {renderShowType(showType)}
        <Pagination
          count={cards?.length}
          paginate={paginate}
          cardsPerPage={CARDS_PER_PAGE}
          currentPage={currentPage}
        />
      </div>
    </main>
  );
};
