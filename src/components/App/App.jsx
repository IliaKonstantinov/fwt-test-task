import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { paginatePaintings, setPagination, setPerPage } from '../../store/slices/paintingsSlice';
import Filter from '../Filter/Filter';
import Header from '../Header/Header';
import Pagination from '../Pagination/Pagination';
import Paintings from '../Paintings/Paintings';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.paintings.theme);
  const onWidthChange = () => {
    if (window.matchMedia('(min-width: 961px)').matches) {
      dispatch(setPerPage(9));
      dispatch(setPagination());
      dispatch(paginatePaintings());
    }
    if (window.matchMedia('(max-width: 960px)').matches) {
      dispatch(setPerPage(8));
      dispatch(setPagination());
      dispatch(paginatePaintings());
    }
    if (window.matchMedia('(max-width: 720px)').matches) {
      dispatch(setPerPage(6));
      dispatch(setPagination());
      dispatch(paginatePaintings());
    }
  };

  onWidthChange();
  window.onresize = onWidthChange;

  return (
    <div className={`app ${theme === false ? 'app--dark' : ''}`}>
      <Header />
      <Filter />
      <Paintings />
      <Pagination />
    </div>
  );
};

export default App;
