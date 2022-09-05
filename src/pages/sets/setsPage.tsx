import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setsReducer } from "../../app/slices/setsSlice";

import * as Scry from "scryfall-sdk";

export const SetsPage = () => {
  const dispatch = useAppDispatch();

  async function fetchSearch() {
    const result = await Scry.Sets.all();
    dispatch(setsReducer(result));
  }

  fetchSearch();

  const sets = useAppSelector((state) => state.sets.sets);

  return <div>sets</div>;
};
