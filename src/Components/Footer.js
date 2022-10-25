import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/drinks">
        <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="drink" />
      </Link>
      <Link to="/explore">
        <img src={ exploreIcon } data-testid="explore-bottom-btn" alt="exp" />
      </Link>
      <Link to="/foods">
        <img src={ mealIcon } data-testid="food-bottom-btn" alt="food" />
      </Link>
    </footer>
  );
}

export default Footer;
