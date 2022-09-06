import * as Scry from "scryfall-sdk";
import s from "./legality.module.scss";

interface Props {
  card: Scry.Card | undefined;
}

const FORMATS: Array<string> = [
  "standard",
  "modern",
  "legacy",
  "vintage",
  "commander",
  "pioneer",
];

export const Legality = (props: Props) => {
  const { card } = props;

  return (
    <div className={s.legality__wrapper}>
      {FORMATS.map((format: string) => (
        <div className={s.legality__format_wrapper} key={format}>
          <div
            className={`${s.legality__format_legality} ${
              s[card?.legalities[format as unknown as number] as string]
            }`}
          >
            {card?.legalities[format as unknown as number]
              .toUpperCase()
              .replace(/_/, " ")}
          </div>
          <div className={s.legality__format_name}>{format}</div>
        </div>
      ))}
    </div>
  );
};
