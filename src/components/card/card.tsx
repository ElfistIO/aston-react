import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { WishButton } from "../UI/wishButton/wishButton";
import { UserAuth } from "../../services/AuthContext/AuthContext";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../services/firestore";

import * as Scry from "scryfall-sdk";
import s from "./card.module.scss";

interface Props {
  card: Scry.Card | undefined;
}

export const Card = (props: Props) => {
  const { card } = props;
  const { user } = UserAuth();
  const [isWish, setIsWish] = useState<boolean>();
  const [wishIcon, setwishIcon] = useState("favorite_border");
  const [isCollection, setIsCollection] = useState<boolean>();
  const [collectionIcon, setCollectionIcon] = useState("playlist_add");
  const refCard = useRef<HTMLDivElement | null>(null);

  function handleTransform(e: React.SyntheticEvent) {
    e.preventDefault();
    refCard.current?.classList.toggle(`${s.flip__card}`);
  }

  async function addToWishList(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!isCollection) {
      await setDoc(
        doc(db, "users", `${user?.uid}`, "wishList", `${card!.id}`),
        card?.related_uris
      );
      setwishIcon("favorite");
    } else {
      await deleteDoc(
        doc(db, "users", `${user?.uid}`, "wishList", `${card!.id}`)
      );
      setwishIcon("favorite_border");
    }
  }

  async function addToCollection(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!isWish) {
      await setDoc(
        doc(db, "users", `${user?.uid}`, "collection", `${card!.id}`),
        card?.related_uris
      );
      setCollectionIcon("playlist_add_check");
    } else {
      await deleteDoc(
        doc(db, "users", `${user?.uid}`, "collection", `${card!.id}`)
      );
      setCollectionIcon("playlist_add");
    }
  }

  useEffect(() => {
    async function checkCardCollection() {
      const cardRef = doc(
        db,
        "users",
        `${user?.uid}`,
        "collection",
        `${card!.id}`
      );
      const docSnap = await getDoc(cardRef);
      if (docSnap.exists()) {
        setIsCollection(true);
        setCollectionIcon("playlist_add_check");
      } else {
        setIsCollection(false);
        setCollectionIcon("playlist_add");
      }
    }

    async function checkWishList() {
      const cardRef = doc(
        db,
        "users",
        `${user?.uid}`,
        "wishList",
        `${card!.id}`
      );
      const docSnap = await getDoc(cardRef);
      if (docSnap.exists()) {
        setIsWish(true);
        setwishIcon("favorite");
      } else {
        setIsWish(false);
        setwishIcon("favorite_border");
      }
    }

    if (user) {
      checkCardCollection();
      checkWishList();
    }
  }, [card, user]);

  return (
    <Link to={{ pathname: "/card", search: `id=${card?.id}` }}>
      <div className={s.card__img_wrapper}>
        <div className={s.card__img_flip} ref={refCard}>
          {card?.layout === "normal" ? (
            <div className={s.card__img_front}>
              <img
                src={card.image_uris?.png}
                alt={`${card.name}`}
                className={s.card__img}
              />
              {user && (
                <div className={s.card__wish}>
                  <WishButton icon={wishIcon} action={addToWishList} />
                  <WishButton icon={collectionIcon} action={addToCollection} />
                </div>
              )}
            </div>
          ) : (
            <>
              <div className={s.card__img_front}>
                <img
                  src={card?.card_faces[0].image_uris?.png}
                  alt={`${card?.name}`}
                  className={s.card__img}
                />
                <button
                  className={s.card__img_transform}
                  onClick={handleTransform}
                >
                  <i className="material-icons">rotate_left</i>
                </button>
                {user && (
                  <div className={s.card__wish}>
                    <WishButton icon={wishIcon} action={addToWishList} />
                    <WishButton
                      icon={collectionIcon}
                      action={addToCollection}
                    />
                  </div>
                )}
              </div>
              <div className={s.card__img_back}>
                <img
                  src={card?.card_faces[1].image_uris?.png}
                  alt={`${card?.name}`}
                  className={s.card__img}
                />
                <button
                  className={s.card__img_transform}
                  onClick={handleTransform}
                >
                  <i className="material-icons">rotate_left</i>
                </button>
                {user && (
                  <div className={s.card__wish}>
                    <WishButton icon={wishIcon} action={addToWishList} />
                    <WishButton
                      icon={collectionIcon}
                      action={addToCollection}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
