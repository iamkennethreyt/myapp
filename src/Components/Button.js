import PropTypes from 'prop-types';

const Button = ({ text, onClick, showForm }) => {
  return (
    <button
      className='btn'
      onClick={onClick}
      style={{ backgroundColor: `${showForm ? 'red' : 'green'}` }}
    >
      {showForm ? 'Close' : 'Add'}
    </button>
  );
};

Button.defaultProps = {
  text: 'Create'
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
