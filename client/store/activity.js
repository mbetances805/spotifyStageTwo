import axios from 'axios';
import history from '../history';

const GET_ACTIVITIES = 'GET_ACTIVITIES';
const CREATE_ACTIVITY = 'CREATE_ACTIVITY';

const getActivities = activities => ({type: GET_ACTIVITIES, activities});
const createActivity = activity => ({type: CREATE_ACTIVITY, activity});

export const fetchActivities = () =>
  dispatch =>
    axios.get(`/api/activities`)
      .then(res =>
        dispatch(getActivities(res.data)))
      .catch(err => console.log(err));

export const postActivity = (activity) =>
  dispatch => {
    axios.post(`/api/activities`, activity)
      .then(res => res.data)
      .then(newActivity => {
        dispatch(createActivity(newActivity))
      })
      .catch(err => console.log(err))
    };

export default function reducer (state = [], action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return action.activities;

    case CREATE_ACTIVITY:
      return [...state, action.activity];

    default:
      return state;
  }
}
