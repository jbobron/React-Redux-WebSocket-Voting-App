import {setEntries, next, vote, INITIAL_STATE} from './core'

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
   case 'SET_ENTRIES':
     return setEntries(state, action.entries);
   case 'NEXT':
     return next(state);
   case 'VOTE':
     //to promote modularity, this updates only the 
     //vote subtree instead of the entire state tree
     //refer to 'reducer composition' in redux doc 
     return state.update('vote', voteState => vote(voteState, action.entry));
   }
   return state;
}