import React, { Component } from 'react';

import Question from './Question.jsx';
import Footer from './Footer.jsx';

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
      ask: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.submitQuestion = this.submitQuestion.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value})
	};

	submitQuestion(event) {
		console.log(this.state.ask)
		event.preventDefault();
    this.setState({ask: this.state.value})
	};

	render() {
		return(
      <div>
        <h1 className="title">ASK JELLY</h1>
        <div className="input-form">
        		<input 	type="text"
        						placeholder="Ask away!"
        						onChange={this.handleChange}
        						 />
        		<submit onClick={this.submitQuestion}>ASK</submit>
        </div>
        	{this.state.ask ? <Question ask={this.state.ask} /> : false }
        <Footer />
      </div>
		)
	};
};
