import React, { Component } from 'react';

export default class Question extends Component {
	constructor(props) {
    super(props);
    
    this.splitQuestion = this.splitQuestion.bind(this);
	};

  splitQuestion(str, min, max, ideal) {

  };

  render(){
  	return(
      <div className="question">
        <div className="left-q">
          {this.props.ask}
        </div>

        <div className="right-q">
          Right
        </div>
      </div>
  	)
  };
};
