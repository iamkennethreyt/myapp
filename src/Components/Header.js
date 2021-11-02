import PropTypes from 'prop-types';
import Button from './Button';
import { useLocation, useParams } from 'react-router';

const Header = ({ title, onShowAdd, showForm }) => {
  const location = useLocation();

  console.log(useParams());
  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button onClick={onShowAdd} text='Add' showForm={showForm} />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: 'Task Tracker'
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
