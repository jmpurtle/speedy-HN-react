import React, {Component} from 'react';

class HNSummary extends Component {

	constructor(props) {
		super(props);

		this.state = {
			by: null,
			descendants: null,
			id: null,
			kids: 0,
			score: null,
			time: null,
			title: null,
			type: null,
			url: null
		}
	}

	retrieveSummary() {
		fetch("/api/" + this.props.item).then(function(response) {
			return response.json();
		}).then((respJson) => {
			this.setState({by: respJson['by']});
			this.setState({descendants: respJson['descendants']});
			this.setState({id: respJson['id']});
			this.setState({kids: (respJson['kids'] ? respJson['kids'].length : 0)});
			this.setState({score: respJson['score']});
			this.setState({time: respJson['time']});
			this.setState({title: respJson['title']});
			this.setState({type: respJson['type']});
			this.setState({url: respJson['url']});
		});
	}

	componentDidMount() {
		this.retrieveSummary();
	}

	componentDidUpdate(prevProps) {
		if (this.props.item !== prevProps.item) {
			this.retrieveSummary();
		}
	}

    render() {
        return (
            <li>
            	<a rel="noopener noreferrer" className="hnThread" href={'https://news.ycombinator.com/item?id=' + this.state.id} target="blank">
            		{this.state.kids} comments
            	</a>
            	<a rel="noopener noreferrer" className="hnArticle" href={this.state.url} target="_blank">
            		{this.state.title}
            	</a>
            </li>
        );
    }
}

export default HNSummary;