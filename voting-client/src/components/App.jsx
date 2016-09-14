import React from 'react';

// where does this.props come from? Provider?
// if so, how does 'state' from provider become 'props.children' here?
// why are we accessing this.props.children?
export default React.createClass({
  render: function() {
    return this.props.children;
    
  }
});