import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { WishButton } from "../UI/wishButton/wishButton";
import { useAuth } from "../../services/AuthContext/AuthContext";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../services/firestore";

import * as Scry from "scryfall-sdk";
import s from "./card.module.scss";

interface Props {
  card: Scry.Card | undefined;
}

export const Card = (props: Props) => {
  const { card } = props;
  const { user } = useAuth();
  const [isWish, setIsWish] = useState<boolean>(false);
  const [wishIcon, setwishIcon] = useState("favorite_border");
  const [isCollection, setIsCollection] = useState<boolean>(false);
  const [collectionIcon, setCollectionIcon] = useState("playlist_add");
  const refCard = useRef<HTMLDivElement | null>(null);

  function handleTransform(e: React.SyntheticEvent) {
    e.preventDefault();
    refCard.current?.classList.toggle(`${s.flip__card}`);
  }

  // async function addToList(e: React.SyntheticEvent, listname: string) {
  //   e.preventDefault();
  //   if (!(listname === "wishList" ? isWish : isCollection)) {
  //     await setDoc(doc(db, "users", `${user?.uid}`, listname, `${card!.id}`), {
  //       card,
  //     });
  //     listname === "wishList"
  //       ? setwishIcon("favorite")
  //       : setCollectionIcon("playlist_add_check");
  //   } else {
  //     await deleteDoc(
  //       doc(db, "users", `${user?.uid}`, listname, `${card!.id}`)
  //     );
  //     listname === "wishList"
  //       ? setwishIcon("favorite_border")
  //       : setCollectionIcon("playlist_add");
  //   }
  // }

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
    async function checkCards(listname: string) {
      const cardRef = doc(db, "users", `${user?.uid}`, listname, `${card?.id}`);
      const docSnap = await getDoc(cardRef);
      if (docSnap.exists()) {
        switch (listname) {
          case "collection":
            setIsCollection(true);
            setCollectionIcon("playlist_add_check");
            break;
          case "wishList":
            setIsWish(true);
            setwishIcon("favorite");
            break;
          default:
            setIsCollection(false);
            setIsWish(false);
            break;
        }
      } else {
        switch (listname) {
          case "collection":
            setIsCollection(false);
            setCollectionIcon("playlist_add");
            break;
          case "wishList":
            setIsWish(false);
            setwishIcon("favorite_border");
            break;
          default:
            console.log(`List with name ${listname} does not exists!`);
            break;
        }
      }
    }

    if (user) {
      checkCards("collection");
      checkCards("wishList");
    }
  }, [card, user]);

  return (
    <Link to={{ pathname: "/card", search: `id=${card?.id}` }}>
      <div className={s.card__img_wrapper}>
        <div className={s.card__img_flip} ref={refCard}>
          {card?.layout === "normal" ? (
            <div className={s.card__img_front}>
              <img
                src={card.image_uris?.large}
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
                  src={card?.card_faces.at(0)?.image_uris?.large}
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
                  src={card?.card_faces.at(1)?.image_uris?.large}
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
