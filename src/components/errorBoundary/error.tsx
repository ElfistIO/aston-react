import s from "./error.module.scss";

export const Error = () => {
  return (
    <div className={s.error__wrapper}>
      <h4>Sorry... There was an error.</h4>
    </div>
  );
};
