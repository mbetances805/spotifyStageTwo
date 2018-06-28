import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom'
import {postActivity} from '../store'
import moment from 'moment';

class Overlay extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      location: '',
      description: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.clearState = this.clearState.bind(this);
    this.updateStateDate = this.updateStateDate.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.updateSubmitButton = this.updateSubmitButton.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.activeDate !== this.props.activeDate) {
      this.setState({ startDate: nextProps.activeDate, endDate: nextProps.activeDate });
    }
  }

  handleChange (evt) {
    const {name} = evt.target;
    this.setState({ [name]: evt.target.value }, () => this.updateSubmitButton());
  }

  updateSubmitButton () {
    const {title, location, startTime, endTime} = this.state;
    let button = document.getElementsByClassName('save-button');
    let timeDiff = moment.duration(moment(endTime, 'HH:mm a').diff(moment(startTime, 'HH:mm a'))).asHours()

    if (title.length && location.length && startTime.length && endTime.length && timeDiff > 0) {
      button[0].removeAttribute('disabled');
    } else {
      button[0].setAttribute('disabled', '');
    }
  }

  updateStateDate (evt) {
    evt.preventDefault();
    this.setState((prevState, props) => {
      return { startDate: props.activeDate, endDate: props.activeDate }
    }, () => {
      this.props.createActivity(this.state);
      this.props.toggleForm();
      this.clearState();
    })
  }

  cancelForm (evt) {
    evt.preventDefault();
    this.props.toggleForm(evt);
    this.clearState();
  }

  clearState = () => {
    this.setState({
     title: '',
     location: '',
     description: '',
     startDate: '',
     endDate: '',
     startTime: '',
     endTime: '',
    })
  }

  render () {
    return (
      <div className='overlay-container'>
        <span>{ moment(this.props.activeDate).format('MMM DD, YYYY') }</span>
        <form className='overlay-form' onSubmit={this.updateStateDate}>
          <label htmlFor='title'>{'Title*'}</label>
          <input
            id='title-field'
            name='title'
            type='text'
            value={this.state.title}
            rows='5'
            onChange={this.handleChange}
          /><br />
          <label htmlFor='location'>{'Location*'}</label>
          <input
            id='location-field'
            name='location'
            type='text'
            value={this.state.location}
            onChange={this.handleChange}
          /><br />
          <label htmlFor='description'>{'Description'}</label>
          <textarea
            id='description-field'
            name='description'
            type='text'
            rows='5'
            cols='48'
            value={this.state.description}
            onChange={this.handleChange}
          /><br />
          <label htmlFor='startTime'>{'Start Time*'}</label>
          <input
            id='startTime-field'
            name='startTime'
            type='time'
            value={this.state.startTime}
            onChange={this.handleChange}
          /><br />
          <label htmlFor='endTime'>{'End Time*'}</label>
          <input
            id='endTime-field'
            name='endTime'
            type='time'
            value={this.state.endTime}
            onChange={this.handleChange}
          /><br />
          <button
            className='save-button'
            type='submit'
            disabled
          >
            {'Save'}
          </button>
          <button className='close-button' onClick={this.cancelForm}>{'Cancel'}</button>
        </form>
      </div>
    );
  }
};

const mapState = null;

const mapDispatch = dispatch => ({
  createActivity: (activity) => {
    dispatch(postActivity(activity));
  }
});

export default withRouter(connect(mapState, mapDispatch)(Overlay));

// to populate
Overlay.propTypes = {

};
