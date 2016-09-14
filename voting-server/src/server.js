import Server from 'socket.io';

//any authorizations for clients should happen here

export default function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });

}


/* 

This server basically opperates as follows:

A client sends an action to the server.
The server hands the action to the Redux Store.
The Store calls the reducer and the reducer executes the logic related to the action.
The Store updates its state based on the return value of the reducer.
The Store executes the listener function subscribed by the server.
The server emits a 'state' event.
All connected clients - including the one that initiated the original action - receive the new state.

*/