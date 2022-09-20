import { SetStateAction, useEffect, useState } from "react";
import { useAuth } from "../../services/AuthContext/AuthContext";
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../services/firestore";
import { useGetCollectionQuery } from "../../app/slices/apiSlice";
import { ImageType } from "../searchResult/imageType/imageType";
import { Filter } from "../../components/filter/filter";
import { ChecklistType } from "../searchResult/checklistType/checklistType";
import { FullType } from "../searchResult/FullType/FullType";
import { Pagination } from "../../components/pagination/pagination";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCollection } from "../../app/slices/collection";

import s from "./collection.module.scss";

export const Collection = () => {
  const { user } = useAuth();
  const userCollection = useAppSelector((state) => state.collection.collection);
  const [showType, setShowType] = useState<string>("images");
  // заготовка
  const [sortListBy, setSortListBy] = useState<string>("name");
  const { data, isLoading } = useGetCollectionQuery(
    {
      identifiers: userCollection,
    },
    { skip: !userCollection }
  );
  const [currentPage, setCurrentPage] = useState(1);
  const CARDS_PER_PAGE = 20;
  const indexOfLastCard = currentPage * CARDS_PER_PAGE;
  const indexOfFirstCard = indexOfLastCard - CARDS_PER_PAGE;
  const currentCards = data?.data.slice(indexOfFirstCard, indexOfLastCard);
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
    const queryCollection = query(
      collection(db, "users", `${user?.uid}`, "collection")
    );
    async function getCards() {
      await onSnapshot(queryCollection, (querySnapshot) => {
        const cards: Array<DocumentData> = [];
        querySnapshot.forEach((doc) => {
          cards.push(doc.data());
        });
        dispatch(setCollection(cards));
      });
    }
    getCards();
  }, [dispatch, user?.uid]);

  return (
    <div className={s.collection__wrapper}>
      <Filter setShowType={setShowType} setSortListBy={setSortListBy} />
      <div className="container">
        {isLoading ? (
          <div className="progress cyan lighten-1">
            <div className="indeterminate"></div>
          </div>
        ) : (
          <>
            {renderShowType(showType)}
            {data?.data && (
              <Pagination
                count={data?.data.length}
                paginate={paginate}
                cardsPerPage={CARDS_PER_PAGE}
                currentPage={currentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
