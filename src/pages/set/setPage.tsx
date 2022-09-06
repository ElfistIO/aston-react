import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { SetInfo } from "../../components/setInfo/setInfo";

import * as Scry from "scryfall-sdk";
import s from "./setPage.module.scss";
import { useSearchParams } from "react-router-dom";

export const SetPage = () => {
  const [set, setSet] = useState<Scry.Set>();
  const [searchParams] = useSearchParams();
  const setId = searchParams.get("id");

  useEffect(() => {
    async function getCard() {
      await Scry.Sets.byId(setId!)
        .then((set) => setSet(set))
        .catch(console.error);
    }
    getCard();
  }, [setId]);

  return <div></div>;
};
