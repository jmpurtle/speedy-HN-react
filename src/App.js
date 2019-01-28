import React, { Component } from 'react';
import './App.css';
import HNSummary from './HNSummary';

class App extends Component {
  
  constructor(props) {
    super(props);
 
    this.state = {
      storyIds: []
    }
  }

  componentDidMount() {
    fetch("/api").then(function(response) {
      return response.text();
    }).then((text) => {
      this.setState({storyIds: JSON.parse(text)})
    });
  }

  render() {
    return (
      <div className="App">
        <ol>
          {this.state.storyIds.slice(0,5).map((item, key) =>
            <HNSummary item={item} key={key} />
          )}
        </ol>
      </div>
    );
  }

};

export default App;
