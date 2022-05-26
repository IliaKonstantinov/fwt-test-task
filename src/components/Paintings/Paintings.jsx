/* eslint no-debugger: 0 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAuthors, fetchLocations, fetchPaintings, paginatePaintings, setPagination,
} from '../../store/slices/paintingsSlice';
import './Paintings.scss';

const Paintings = () => {
  const dispatch = useDispatch();
  const currentPaintings = useSelector((state) => state.paintings.currentPaintings);
  const locations = useSelector((state) => state.paintings.locations);
  const authors = useSelector((state) => state.paintings.authors);

  useEffect(() => {
    const setPage = async () => {
      await dispatch(fetchPaintings());
      await dispatch(fetchLocations());
      await dispatch(fetchAuthors());
      await dispatch(setPagination());
      dispatch(paginatePaintings());
    };
    setPage();
  }, [dispatch]);

  return (
    <div className="paintings__container">
      {
        currentPaintings.map((painting) => {
          let author;
          let location;

          for (let i = 0; i < authors.length; i += 1) {
            if (authors[i].id === painting.authorId) {
              author = authors[i].name;
            }
          }

          for (let i = 0; i < locations.length; i += 1) {
            if (locations[i].id === painting.locationId) {
              location = locations[i].location;
            }
          }

          return (
            <div className="paintings__item">
              <img
                className="paintings__image"
                src={`https://test-front.framework.team${painting.imageUrl}`}
                alt="Изображение картины"
              />
              <div className="paintings__descr">
                <h2 className="paintings__title">{painting.name}</h2>
                <p className="paintings__string">
                  <span className="paintings__bald">Author: </span>
                  {author}
                </p>
                <p className="paintings__string">
                  <span className="paintings__bald">Created: </span>
                  {painting.created}
                </p>
                <p className="paintings__string">
                  <span className="paintings__bald">Location: </span>
                  {location}
                </p>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default Paintings;
