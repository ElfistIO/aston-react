import { useAppSelector } from "../../app/hooks";
import { Filter } from "../../components/filter/filter";
import { useState } from "react";
import { ImageType } from "./imageType/imageType";
import { ChecklistType } from "./checklistType/checklistType";
import { FullType } from "./FullType/FullType";

import * as Scry from "scryfall-sdk";
import s from "./searchResult.module.scss";
import M from "materialize-css";

export const SearchResult = (): JSX.Element => {
  M.AutoInit();
  const [showType, setShowType] = useState<string>("images");
  const [sortListBy, setSortListBy] = useState<string>("");
  const cards: Array<Scry.Card> = useAppSelector(
    (state) => state.searchResult.searchResult
  );
  const searchInput: string = useAppSelector(
    (state) => state.searchResult.searchInput
  );

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

  function sortList() {
    cards.sort((a, b) => (a.name > b.name ? 0 : -1));
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
