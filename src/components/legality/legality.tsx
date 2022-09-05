import { useEffect, useRef } from "react";

import * as Scry from "scryfall-sdk";
import s from "./legality.module.scss";

interface Props {
  card: Scry.Card;
}

export const Legality = (props: Props) => {
  const card: Scry.Card = props.card;
  const formats: Array<string> = [
    "standard",
    "modern",
    "legacy",
    "vintage",
    "commander",
    "pioneer",
  ];
  const legalityRefs = useRef<Array<HTMLDivElement>>([]);

  function colorizeLegality(ref: HTMLDivElement) {
    switch (ref.innerText) {
      case "NOT LEGAL":
        ref.setAttribute("style", "background-color: #AEAEAE");
        break;
      case "BANNED":
        ref.setAttribute("style", "background-color: rgba(167,31,42,0.58)");
        break;
      case "RESTRICTED":
        ref.setAttribute("style", "background-color: rgba(36,103,130,0.58)");
        break;
      case "LEGAL":
        ref.setAttribute("style", "background-color: #75986E");
        break;
      default:
        break;
    }
  }

  useEffect((): void => {
    legalityRefs.current.forEach((ref) => {
      colorizeLegality(ref);
    });
  });

  return (
    <div className={s.legality__wrapper}>
      {formats.map((format: any, i: number) => (
        <div className={s.legality__format_wrapper} key={format}>
          <div
            className={s.legality__format_legality}
            ref={(element) => (legalityRefs.current[i] = element!)}
          >
            {card.legalities[format].toUpperCase().replace(/_/, " ")}
          </div>
          <div className={s.legality__format_name}>{format}</div>
        </div>
      ))}
    </div>
  );
};
