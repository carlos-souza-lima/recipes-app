import React from 'react';
import PropTypes from 'prop-types';
import './Snackbar.css';

function Snackbar({ open, children, onClose }) {
  return (
    <div className={ `snackbar ${open && 'visible'}` }>
      <span>{children}</span>
      <button
        type="button"
        className="close"
        onClick={ onClose }
      >
        &times;
      </button>
    </div>
  );
}

Snackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Snackbar;
