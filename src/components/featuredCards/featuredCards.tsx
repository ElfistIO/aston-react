import { useEffect, useState } from "react";
import { Card } from "../card/card";

import * as Scry from "scryfall-sdk";
import s from "./featuredCards.module.scss";

export const FeaturedCards = () => {
  const [cards, setCards] = useState<Scry.Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let check = true;
    setIsLoading(true);
    const getRandomCards = async () => {
      const cards: Scry.Card[] = [];
      for (let i = 0; i < 8; i++) {
        await Scry.Cards.random().then((card) => {
          cards.push(card);
        });
      }
      if (check) setCards(cards);
    };
    getRandomCards();
    setTimeout(() => setIsLoading(false), 300);
    return () => {
      check = false;
    };
  }, []);

  return (
    <div className={s.featuredCards__wrapper}>
      {isLoading
        ? null
        : cards.map((card) => <Card card={card} key={card.id} />)}
    </div>
  );
};
