import React from 'react'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main} from './components'

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Main} />
      </Switch>
    </Router>
  );
}

export default Routes;

// to populate
Routes.propTypes = {

};
