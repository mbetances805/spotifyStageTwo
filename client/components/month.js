import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import moment from 'moment';
import {Overlay, Day} from './index';

class Month extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeDate: '',
      showOverlay: false,
      passFormDate: false
    }
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm (evt) {
    const { showOverlay } = this.state;
    let form = document.getElementsByClassName('overlay-container');

    if (!showOverlay) {
      form[0].style.display = 'block';
    } else {
      form[0].style.display = 'none';
    }
    this.setState((prevState, props) => {
      return {
        showOverlay: !prevState.showOverlay,
        passFormDate: !prevState.passFormDate
      }
    })

    if (evt) {
      if (evt.target.firstChild.nodeValue !== 'Cancel') {
        this.passFormDate(evt);
      }
    }
  }

  passFormDate (evt) {
    if (!this.state.passFormDate) {
      let day = evt.target.firstChild.nodeValue;
      if (Number(day) < 9) {
        day = '0' + day;
      }
      this.setState((prevState, props) => ({
        activeDate: `2018-07-${day}`
      }))
    }
  }

  render () {
    const {activities, calendarMonth} = this.props;
    let key = 1;
    let maxDays = 31;
    let numDay = 1;

    const days = [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ];

    const monthActivities = activities.filter(activity => {
      let month = moment(activity.startDate).month();
      return month === calendarMonth;
    });

    return (
      <div className='month-container'>
        {
          days.map(day => {
            return (
              <span key={`${key++}${day}`} className='day'>{day}</span>
            );
          })
        }
        {
          [...Array(maxDays)].map(day => {
            let activities = monthActivities.filter(activity => {
              let day = moment(activity.startDate).date();
              return day === numDay;
            })
            return (
              <Day
                toggleForm={this.toggleForm}
                key={numDay}
                activities={activities}
                day={numDay++}
              />
            )
          })
        }
        <Overlay {...this.state} toggleForm={this.toggleForm} />
      </div>
    );
  }
};

const mapState = null;

const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(Month));

// to populate
Month.propTypes = {

};
