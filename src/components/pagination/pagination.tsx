import s from "./pagination.module.scss";
import PropTypes from "prop-types";

interface Props {
  count: number;
  paginate: (index: number) => void;
  cardsPerPage: number;
  currentPage: number;
}

export const Pagination = ({
  count,
  paginate,
  cardsPerPage,
  currentPage,
}: Props) => {
  const pagesCount = Math.ceil(count / cardsPerPage);
  const onPageNumberClick = (index: number) => {
    paginate(index);
    window.scrollTo(0, 0);
  };

  function prevPage() {
    if (currentPage === 1) return;
    onPageNumberClick(currentPage - 1);
    window.scrollTo(0, 0);
  }

  function nextPage() {
    if (currentPage === pagesCount) return;
    onPageNumberClick(currentPage + 1);
    window.scrollTo(0, 0);
  }

  return (
    <div className={s.pagination__wrapper}>
      <ul className="pagination">
        <li className={s.pagination__item_prev}>
          <button
            type="button"
            className={s.pagination__button_prev}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <i className="material-icons">chevron_left</i>
          </button>
        </li>
        {[...new Array(pagesCount)].map((_, index) => (
          <li
            className={
              currentPage === index + 1 ? s.pagination__item : undefined
            }
            key={index}
          >
            <button
              className={s.pagination__button}
              type="button"
              onClick={() => onPageNumberClick(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li className={s.pagination__item_next}>
          <button
            type="button"
            className={s.pagination__button_next}
            onClick={nextPage}
            disabled={currentPage === pagesCount}
          >
            <i className="material-icons">chevron_right</i>
          </button>
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  count: PropTypes.number,
  paginate: PropTypes.func,
  cardsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
};
