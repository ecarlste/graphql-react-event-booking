import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={null} />
        <Route path="/auth" component={null} />
        <Route path="/events" component={null} />
        <Route path="/bookings" component={null} />
      </BrowserRouter>
    );
  }
}

export default App;
