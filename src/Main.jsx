import React, { Component } from 'react';

import Answer from './Answer.jsx';
import Footer from './Footer.jsx';

export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
      resp: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.submitAnswer = this.submitAnswer.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value})
	};

	submitAnswer(event) {
		console.log(this.state.resp)
		event.preventDefault();
    this.setState({resp: this.state.value})
	};

	render() {
		return(
      <div className="main-div">
        <h1 className="title">ANSWER JELLY</h1>
        <h4 className="signature">By Lucy Wonsower</h4>
        <div className="input-form">
        		<input 	type="text"
        						placeholder="Answer away!"
        						onChange={this.handleChange}
        						 />
        		<submit onClick={this.submitAnswer}>Answer</submit>
        </div>
        	{this.state.resp ? <Answer resp={this.state.resp} /> : false }
      </div>
		)
	};
};
