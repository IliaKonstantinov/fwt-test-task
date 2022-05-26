import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterByName,
  paginatePaintings,
  setPagination,
} from '../../store/slices/paintingsSlice';
import { ReactComponent as Line } from '../../assets/images/input__line.svg';
import './Filter.scss';

const Filter = () => {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.paintings.authors);
  const locations = useSelector((state) => state.paintings.locations);
  const theme = useSelector((state) => state.paintings.theme);

  return (
    <div className="filter__container">
      <input
        className={`filter__input ${theme === false ? 'input--dark' : ''}`}
        onChange={async (e) => {
          await dispatch(filterByName(e.target.value));
          dispatch(setPagination());
          dispatch(paginatePaintings());
        }}
        placeholder="name"
      />
      <select
        className={`filter__select ${theme === false ? 'select--dark' : ''}`}
      >
        <option hidden>Author</option>
        {
          authors.map((author) => (
            <option className="filter__option" key={author.id}>{author.name}</option>
          ))
        }
      </select>
      <select
        className={`filter__select ${theme === false ? 'select--dark' : ''}`}
      >
        <option hidden>Location</option>
        {
          locations.map((location) => (
            <option key={location.id}>{location.location}</option>
          ))
        }
      </select>
      <div className="filter__timeline">
        <input placeholder="from" className="filter__time" />
        <span>
          <Line className={`filter__line ${theme === false ? 'line--dark' : ''}`} />
        </span>
        <input placeholder="before" className="filter__time" />
      </div>
    </div>
  );
};

export default Filter;
