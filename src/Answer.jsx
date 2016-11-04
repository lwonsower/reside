import React, { Component } from 'react';

export default class Answer extends Component {
	constructor(props) {
    super(props);
    
    this.splitAnswer = this.splitAnswer.bind(this);
	};

  splitAnswer(str, min, max, ideal) {

  };

  render(){
  	return(
      <div className="answer-div">
        <div className="left-q">
          {this.props.resp}
        </div>

        <div className="right-q">
          Right
        </div>
      </div>
  	)
  };
};