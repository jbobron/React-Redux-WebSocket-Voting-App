import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';

require('./style.css');
//https://medium.com/@meagle/understanding-87566abcfb7a#.tzkte9b8d
//concepts used here: curring, composing functions
const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
  store.dispatch(setState(state))
);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);


const routes = <Route component={App}>
  <Route path="/results" component={ResultsContainer} />
  <Route path="/" component={VotingContainer}/>
</Route>;



ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

/*
<Router>     Router is the root component of our application
  <Route>    Route allows us to define our routing table and is the
             root Route in the config, which will be shared with all
             the concrete routes within.  It allows us to render all 
             the jsx 'markup' code that is common across all routes
    <Route path="/" component={Home}/>
    <Route path="/pictures" component={Pictures}/>
    <Route path="/about" component={About}/>
  </Route>
</Router>

func applyMid() {                   //next is our reducer func
  return func(next) {
    func(reducer, initialState) {
      store = next(reducer)     //composing functions
      dispatch = store.dispatch
      ...calls to middleware, dispatch is modified
      return {store, dispatch}
    }
  }
}


*/




