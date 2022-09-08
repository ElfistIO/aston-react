import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { Filter } from "../../components/filter/filter";
import { ImageType } from "./imageType/imageType";
import { ChecklistType } from "./checklistType/checklistType";
import { FullType } from "./FullType/FullType";

import s from "./searchResult.module.scss";

export const SearchResult = () => {
  const [showType, setShowType] = useState<string>("images");
  const [sortListBy, setSortListBy] = useState<string>("name");
  const cards = useAppSelector((state) => state.searchResult.searchState);
  const searchInput = useAppSelector((state) => state.searchResult.searchInput);

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

  // function sortList(sortListBy: string) {
  //   switch (sortListBy) {
  //     case "name":
  //       cards.slice().sort((a, b) => (a.name > b.name ? 0 : -1));
  //       break;
  //     case "set":
  //       cards.slice().sort((a, b) => (a.set_name > b.set_name ? 0 : -1));
  //       break;
  //     case "rarity":
  //       cards.slice().sort((a, b) => (a.rarity > b.rarity ? 0 : -1));
  //       break;
  // case "color":
  //   cards.slice().sort((a, b) => (a.colors > b.colors ? 0 : -1));
  //   break;
  //     default:
  //       cards.slice().sort((a, b) => (a.name > b.name ? 0 : -1));
  //       break;
  //   }
  // }

  // useEffect(() => {
  //   sortList(sortListBy);
  // }, [sortListBy]);

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
