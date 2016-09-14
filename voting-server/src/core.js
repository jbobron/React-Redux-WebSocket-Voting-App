import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state){
  const entries = state.get('entries').concat(getWinners(state.get('vote')));
  if(entries.size === 1){
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2) 
    });
  }
}

export function vote(voteState, entry){
  return voteState.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
  );
}

function getWinners(vote){
  if(!vote) return [];
  const [a, b] = vote.get('pair').toArray(); //array destruct.
  //had to add toArray becuase get returns immutable List not an Array
  const tallyA = vote.getIn(['tally', a], 0);
  const tallyB = vote.getIn(['tally', b], 0);
  if(tallyA > tallyB) return [a];
  if(tallyA < tallyB) return [b];
  else return [a, b];
}