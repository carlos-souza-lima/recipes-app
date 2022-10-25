import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';
import './Header.css';

const needsSearchBtn = ['Foods', 'Drinks', 'Explore Nationalities'];

function Header({ title }) {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const history = useHistory();

  const profileRedirect = () => {
    history.push('/profile');
  };

  return (
    <header className="header-app">
      <div className="header-div">
        <input
          type="image"
          alt="Profile Icon"
          data-testid="profile-top-btn"
          src="https://cdn-icons-png.flaticon.com/512/3699/3699708.png"
          className="img-header"
          onClick={ profileRedirect }
        />

        <h1 data-testid="page-title">{ title }</h1>

        { needsSearchBtn.includes(title) ? <input
          type="image"
          alt="Search Icon"
          data-testid="search-top-btn"
          src={ searchIcon }
          onClick={ () => setShowSearchInput(!showSearchInput) }
        /> : <span /> }
      </div>

      { showSearchInput
        ? <HeaderSearchBar title={ title } />
        : null }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
