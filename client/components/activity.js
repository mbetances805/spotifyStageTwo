import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Activity = (props) => {
  const {activities} = props;

  return (
    <div>
      {
        activities.map(activity => {
          return (
            <div className='calendar-activity' key={activity.id}>
              <span key={activity.id}>
                {`${activity.title}`}<br />
                {`${moment(activity.startTime, 'hh:mm a').format('h:mm a')}`}
                {` - ${moment(activity.endTime, 'hh:mm a').format('h:mm a')} `}
              </span>
            </div>
          )
        }
      )
    }
    </div>
  );
};

export default Activity;

// to populate
Activity.propTypes = {

};
