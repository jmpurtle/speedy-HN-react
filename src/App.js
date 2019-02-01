import React, { Component } from 'react';
import './App.css';
import HNSummary from './HNSummary';

class App extends Component {
  
  constructor(props) {
    super(props);
 
    this.state = {
      storyIds: [],
      limit: parseInt(this.getUrlParameter('limit', 20)),
      offset: parseInt(this.getUrlParameter('offset', 0))
    }
    this.pageBack = this.pageBack.bind(this);
    this.pageForward = this.pageForward.bind(this);
    this.changeLimit = this.changeLimit.bind(this);
  }

  getUrlParameter(name, defaultVal) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? defaultVal : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  pageBack(e) {
    e.preventDefault();
    const calculatedOffset = this.state.offset - this.state.limit;
    const newOffset = (calculatedOffset > 0) ? calculatedOffset : 0;
    this.setState({offset: newOffset});
  }

  pageForward(e) {
    e.preventDefault();
    const newOffset = this.state.offset + this.state.limit;
    this.setState({offset: newOffset});
  }

  changeLimit(e) {
    e.preventDefault();
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

    const calculatedPageDownOffset = this.state.offset - this.state.limit;
    const pageDownOffset = (calculatedPageDownOffset > 0) ? calculatedPageDownOffset : 0;

    const pageUpOffset = this.state.offset + this.state.limit;

    const summaries = currentSummaries.map((item, key) => {
      return <HNSummary item={item} key={key} />;
    });

    return (
      <div className="App">
        <header className="siteHeader">
          <h1>Speedy Hacker News</h1>
          <span>Less clicking, more reading</span>
        </header>
        <div className="viewLimits">
          <a className="btn limits" href={'/?limit=10&offset=' + this.state.offset} onClick={this.changeLimit} data-limit="10">10 items</a>
          <a className="btn limits" href={'/?limit=20&offset=' + this.state.offset} onClick={this.changeLimit} data-limit="20">20 items</a>
          <a className="btn limits" href={'/?limit=50&offset=' + this.state.offset} onClick={this.changeLimit} data-limit="50">50 items</a>
        </div>
        <ol>
          {summaries}
        </ol>
        <div className="pagination">
          <a className="btn pageArrow" href={'/?limit=' + this.state.limit + '&offset=' + pageDownOffset} onClick={this.pageBack}>&lt;</a>
          <a className="btn pageArrow" href={'/?limit=' + this.state.limit + '&offset=' + pageUpOffset} onClick={this.pageForward}>&gt;</a>
        </div>
      </div>
    );
  }

};

export default App;
