import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Activity} from './index';

const Day = (props) => {
  const {day, activities, toggleForm} = props;

  return (
    <React.Fragment>
      <Link to='/'>
        <div onClick={toggleForm} className='day-num-container'>
          {day}
          <Activity activities={activities} />
        </div>
      </Link>
    </React.Fragment>
  );
};

export default Day;

//to populate
Day.propTypes = {

};
