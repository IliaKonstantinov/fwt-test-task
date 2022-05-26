import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  firstPage,
  lastPage, pageDecrement, pageIncrement, paginatePaintings, setCurrentPage, setPagination,
} from '../../store/slices/paintingsSlice';
import { ReactComponent as Decrement } from '../../assets/images/pagination__decr.svg';
import { ReactComponent as Increment } from '../../assets/images/pagination__incr.svg';
import { ReactComponent as OnFirstPage } from '../../assets/images/pagination__onFirstPage.svg';
import { ReactComponent as OnLastPage } from '../../assets/images/pagination__onLastPage.svg';
import './Pagination.scss';

const Pagination = () => {
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.paintings.pages);
  const totalPages = useSelector((state) => state.paintings.totalPages);
  const currentPage = useSelector((state) => state.paintings.currentPage);
  const theme = useSelector((state) => state.paintings.theme);

  return (
    <div className="pagination__container">
      <div
        role="button"
        tabIndex={0}
        onKeyPress={0}
        onClick={() => {
          dispatch(firstPage());
          dispatch(setPagination());
          dispatch(paginatePaintings());
        }}
        className={`pagination__image pagination__first ${currentPage === 1 ? 'image--disabled' : ''} ${theme === false ? 'image--dark' : ''}`}
      >
        <OnFirstPage className={`${theme === false ? 'svg--dark' : ''}`} />
      </div>
      <div
        role="button"
        tabIndex={0}
        onKeyPress={0}
        onClick={() => {
          dispatch(pageDecrement());
          dispatch(setPagination());
          dispatch(paginatePaintings());
        }}
        className={`pagination__image ${currentPage === 1 ? 'image--disabled' : ''} ${theme === false ? 'image--dark' : ''}`}
      >
        <Decrement className={`${theme === false ? 'svg--dark' : ''}`} />
      </div>
      {
        pages.map((page) => (
          <span
            role="button"
            tabIndex={0}
            onKeyPress={0}
            onClick={() => {
              dispatch(setCurrentPage(page));
              dispatch(setPagination());
              dispatch(paginatePaintings());
            }}
            className={`pagination__page ${currentPage === page ? 'current--page' : ''} ${theme === false ? 'page--dark' : ''} ${currentPage === page && theme === false ? 'current--page--dark' : ''}`}
          >
            {page}
          </span>
        ))
      }
      <div
        role="button"
        tabIndex={0}
        onKeyPress={0}
        onClick={() => {
          dispatch(pageIncrement());
          dispatch(setPagination());
          dispatch(paginatePaintings());
        }}
        className={`pagination__image ${currentPage === totalPages.length ? 'image--disabled' : ''} ${theme === false ? 'image--dark' : ''}`}
      >
        <Increment className={`${theme === false ? 'svg--dark' : ''}`} />
      </div>
      <div
        role="button"
        tabIndex={0}
        onKeyPress={0}
        onClick={() => {
          dispatch(lastPage());
          dispatch(setPagination());
          dispatch(paginatePaintings());
        }}
        className={`pagination__image pagination__last ${currentPage === totalPages.length ? 'image--disabled' : ''} ${theme === false ? 'image--dark' : ''}`}
      >
        <OnLastPage className={`${theme === false ? 'svg--dark' : ''}`} />
      </div>
    </div>
  );
};

export default Pagination;
