import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import * as Scry from "scryfall-sdk";
import { Card } from "scryfall-sdk";
import { SetHeader } from "../../components/setHeader/setHeader";
import { ChecklistType } from "../searchResult/checklistType/checklistType";
import { FullType } from "../searchResult/FullType/FullType";
import { ImageType } from "../searchResult/imageType/imageType";
import s from "./setPage.module.scss";

export const SetPage = () => {
  const [set, setSet] = useState<Scry.Set>();
  const [cards, setCards] = useState<Card[]>();
  const [searchParams] = useSearchParams();
  const [showType, setShowType] = useState<string>("images");
  // сортировка пока не реализована. заготовка
  const [sortListBy, setSortListBy] = useState<string>("name");
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);
  const setId = searchParams.get("id");

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

  useEffect(() => {
    setIsLoadingState(true);
    async function getSet() {
      await Scry.Sets.byId(setId!)
        .then((set) => setSet(set))
        .catch(console.error);
    }
    getSet();
    async function getCards() {
      await set
        ?.getCards()
        .then((cards) => setCards(cards))
        .catch(console.error);
    }
    getCards();
    setIsLoadingState(false);
  }, [set, setId]);

  return (
    <div className={s.set__wrapper}>
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
      </div>
    </div>
  );
};
