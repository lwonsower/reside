import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class Answer extends Component {
	constructor(props) {
    super(props);
    this.state = {
      fullAnswer: this.props.resp,
      snipper: '',
      continued: '',
    }

    this.splitAnswer = this.splitAnswer.bind(this);
	};

  splitAnswer(str, min, max, ideal) {
    
  };

  render(){
  	return(
      <div>
        <div className="drop-down">
          <DropdownButton title="OPTIMISE" id="nav-dropdown">
              <MenuItem className="menu-item">Email Subject</MenuItem>
              <MenuItem className="menu-item">Push Notification</MenuItem>
              <MenuItem className="menu-item">Voice</MenuItem>
          </DropdownButton>
        </div>
        <div className="answer-div">
          <div className="left-q">
            <h4>Snippet</h4>
            {this.state.fullAnswer}
          </div>

          <div className="right-q">
            <h4>Continued</h4>
          </div>
        </div>
      </div>
  	)
  };
};