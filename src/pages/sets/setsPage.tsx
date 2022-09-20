import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSets } from "../../app/slices/setsSlice";
import { useEffect } from "react";
import { SetsItem } from "../../components/setsItem/setsItem";

import * as Scry from "scryfall-sdk";
import s from "./sets.module.scss";

export const SetsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchSearch() {
      const result = await Scry.Sets.all();
      dispatch(setSets(result));
    }
    fetchSearch();
  });

  const sets = useAppSelector((state) => state.sets.sets);

  return (
    <div className={s.sets__wrapper}>
      <div className="container">
        <div className={s.sets__box}>
          <div className={s.sets__header_wrapper}>
            <div className={s.sets__header_name}>name</div>
            <div className={s.sets__header_count}>cards</div>
            <div className={s.sets__header_date}>date</div>
          </div>
          {sets.map((set) => (
            <SetsItem key={set.id} set={set} />
          ))}
        </div>
      </div>
    </div>
  );
};
