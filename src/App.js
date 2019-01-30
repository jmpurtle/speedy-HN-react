import React, { Component } from 'react';
import './App.css';
import HNSummary from './HNSummary';

class App extends Component {
  
  constructor(props) {
    super(props);
 
    this.state = {
      storyIds: [],
      limit: 20,
      offset: 0
    }
    this.pageBack = this.pageBack.bind(this);
    this.pageForward = this.pageForward.bind(this);
    this.changeLimit = this.changeLimit.bind(this);
  }

  pageBack() {
    const calculatedOffset = this.state.offset - this.state.limit;
    const newOffset = (calculatedOffset > 0) ? calculatedOffset : 0;
    this.setState({offset: newOffset});
  }

  pageForward() {
    const newOffset = this.state.offset + this.state.limit;
    this.setState({offset: newOffset});
  }

  changeLimit(e) {
    console.log(e.target.dataset.limit);
    this.setState({limit: parseInt(e.target.dataset.limit)});
  }

  componentDidMount() {
    fetch("/api").then(function(response) {
      return response.text();
    }).then((text) => {
      this.setState({storyIds: JSON.parse(text)})
    });
  }

  render() {
    const { storyIds, limit, offset } = this.state;
    const lastSummary = limit + offset;
    const currentSummaries = storyIds.slice(offset, lastSummary);

    const summaries = currentSummaries.map((item, key) => {
      return <HNSummary item={item} key={key} />;
    });

    return (
      <div className="App">
        <div className="viewLimits">
          <button onClick={this.changeLimit} data-limit="10">10 items</button>
          <button onClick={this.changeLimit} data-limit="20">20 items</button>
          <button onClick={this.changeLimit} data-limit="50">50 items</button>
        </div>
        <ol>
          {summaries}
        </ol>
        <div className="pagination">
          <button onClick={this.pageBack}>&lt;</button>
          <button onClick={this.pageForward}>&gt;</button>
        </div>
      </div>
    );
  }

};

export default App;
