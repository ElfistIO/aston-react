import { useAppSelector } from "../../app/hooks";
import { SetInfo } from "../../components/setInfo/setInfo";

import * as Scry from "scryfall-sdk";

interface Props {
  setName: string;
}

export const SetPage = ({ setName }: Props) => {
  const sets: Scry.Set[] = useAppSelector((state) => state.sets.sets);

  return <div>set</div>;
};
