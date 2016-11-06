import React, { Component } from 'react';

export default class Snippet extends Component {
	render() {
		return (
      <div className="snippet">
        {this.props.snippet}
        {this.props.snippet.length}
      </div>
		)
	};
};