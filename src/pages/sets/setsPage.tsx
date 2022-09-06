import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSets } from "../../app/slices/setsSlice";

import * as Scry from "scryfall-sdk";
import { useEffect } from "react";

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
    <div>
      {sets.map((set) => (
        <div>{set.name}</div>
      ))}
    </div>
  );
};
