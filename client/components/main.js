import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {fetchActivities} from '../store';
import {Month} from './index';

class Main extends Component {

  componentDidMount () {
    this.props.getActivities();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.activities.length !== this.props.activities.length) {
      this.props.getActivities();
    }
  }

  render () {
    const month = 'July';
    const year = '2018';

    return (
      <div>
        <h1>spotifyCalendar</h1>
        <div className='main-container'>
          <div className='month-title'>{month}</div>
          <div className='year-title'>{year}</div>
          <Month activities={this.props.activities} calendarMonth={6} />
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  activities: state.activity
})

const mapDispatch = (dispatch) => ({
  getActivities: () => {
    dispatch(fetchActivities())
  }
})

export default withRouter(connect(mapState, mapDispatch)(Main));

// to populate
Main.propTypes = {

};
