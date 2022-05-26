import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/images/logo.svg';
import { ReactComponent as ThemeSvg } from '../../assets/images/theme__change.svg';
import { setTheme } from '../../store/slices/paintingsSlice';
import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.paintings.theme);

  return (
    <div className="header__container">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div
        role="button"
        tabIndex={0}
        onKeyPress={0}
        onClick={() => dispatch(setTheme())}
      >
        <ThemeSvg className={`header__theme ${theme === false ? 'theme--dark' : ''}`} />
      </div>
    </div>
  );
};

export default Header;
