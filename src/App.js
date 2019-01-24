import React, { Component } from 'react';
import RandomQuoteMachine from './components/RandomQuoteMachine/RandomQuoteMachine';

class App extends Component {
  render() {
    return (
      <div className="container">
       <RandomQuoteMachine />
       <p className="text-center mt-4">
         by bojan
       </p>
      </div>
    );
  }
}

export default App;
