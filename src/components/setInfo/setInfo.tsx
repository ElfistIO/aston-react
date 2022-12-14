import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import s from "./setInfo.module.scss";
import * as Scry from "scryfall-sdk";

interface Props {
  card: Scry.Card | undefined;
}

export const SetInfo = (props: Props) => {
  const card = props.card;
  const setName = card?.set_name;
  const [set, setSet] = useState<Scry.Set>();
  const [isLoading, setIsLoading] = useState<boolean>();

  const getSet = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    if (setName) await Scry.Sets.byName(setName).then((set) => setSet(set));
    setIsLoading(false);
  }, [setName]);

  useEffect(() => {
    getSet().catch(console.error);
  }, [getSet]);

  return (
    <Link to={{ pathname: "/set", search: `id=${set?.id}` }}>
      <div className={s.set__wrapper}>
        {isLoading ? (
          <div className={s.printInfo__preloader}>
            <div className="preloader-wrapper small active">
              <div className="spinner-layer spinner-green-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <img
              src={set?.icon_svg_uri}
              alt="set_icon"
              className={s.set__icon}
            />
            <div className={s.set__info_wrapper}>
              <div className={s.set__info_name}>
                {set?.name} {`(${set?.code.toUpperCase()})`}
              </div>
              <div className={s.set__info_card}>
                #{card?.collector_number} {`\u2022`} {card?.rarity} {`\u2022`}{" "}
                {card?.lang.toUpperCase()}
              </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};
