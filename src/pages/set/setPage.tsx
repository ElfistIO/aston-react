import { SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSearchSort, setSearchState } from "../../app/slices/searchSlice";
import { SetHeader } from "../../components/setHeader/setHeader";
import { ChecklistType } from "../searchResult/checklistType/checklistType";
import { FullType } from "../searchResult/FullType/FullType";
import { ImageType } from "../searchResult/imageType/imageType";
import { Pagination } from "../../components/pagination/pagination";

import * as Scry from "scryfall-sdk";
import s from "./setPage.module.scss";

export const SetPage = () => {
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);
  const [set, setSet] = useState<Scry.Set>();
  const [searchParams] = useSearchParams();
  const setId = searchParams.get("id");
  const cards = useAppSelector((state) => state.searchResult.searchState);
  const [showType, setShowType] = useState<string>("images");
  const [sortListBy, setSortListBy] = useState<string>("name");
  const [currentPage, setCurrentPage] = useState(1);
  const CARDS_PER_PAGE = 40;
  const indexOfLastCard = currentPage * CARDS_PER_PAGE;
  const indexOfFirstCard = indexOfLastCard - CARDS_PER_PAGE;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  const paginate = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };
  const dispatch = useAppDispatch();

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
    setIsLoadingState(true);
    // добавлено, чтобы при загрузке нового сета, старый было бы не видно
    dispatch(setSearchState([]));
    async function getSet() {
      if (setId) await Scry.Sets.byId(setId).then(setSet).catch(console.error);
    }
    getSet();
    async function getCards() {
      await set
        ?.getCards()
        .then((result) => dispatch(setSearchState(result)))
        .catch(console.error);
    }
    getCards();
    setIsLoadingState(false);
  }, [dispatch, set, setId]);

  useEffect(() => {
    dispatch(setSearchSort(sortListBy));
  }, [dispatch, sortListBy]);

  return (
    <div className={s.setPage__wrapper}>
      <SetHeader
        set={set}
        setShowType={setShowType}
        setSortListBy={setSortListBy}
      />
      <div className="container">
        {isLoadingState ? (
          <div className="progress cyan lighten-1">
            <div className="indeterminate"></div>
          </div>
        ) : (
          renderShowType(showType)
        )}
        <Pagination
          count={cards?.length}
          paginate={paginate}
          cardsPerPage={CARDS_PER_PAGE}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};
