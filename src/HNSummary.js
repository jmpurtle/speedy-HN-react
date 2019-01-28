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

	componentDidMount() {
		
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

    render() {
        return (
            <li>
            	<a href="{this.state.url}" target="_blank">
            		{this.state.title}
            	</a>
            	<span>
					{this.state.score} points by {this.state.by} | {this.state.kids} comments
            	</span>
            </li>
        );
    }
}

export default HNSummary;