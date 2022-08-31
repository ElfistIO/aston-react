import s from "./searchResult.module.scss";

export const SearchResult = () => {
  return (
    <main className={s.main__result}>
      <div className="container">
        <div className={s.main__cards}></div>
      </div>
    </main>
  );
};
