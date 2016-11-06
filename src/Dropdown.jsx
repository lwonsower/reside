import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class Dropdown extends Component {
	constructor(props) {
    super(props);

    this.changeAnswerSplit = this.changeAnswerSplit.bind(this);
  };

  changeAnswerSplit(min, max, ideal){
  	this.props.splitAnswer(this.props.fullAnswer, min, max, ideal);
  }

	render() {
		//Callback pattern for adjusting Answer split via dropdown menu
		return (
      <div className="drop-down">
        <DropdownButton title="FORMAT" id="nav-dropdown">
          <MenuItem className="menu-item" onClick={() => {
            this.changeAnswerSplit(20, 50, 25);	
          }}>Email Subject</MenuItem>
          <MenuItem className="menu-item" onClick={() => {
            this.changeAnswerSplit(90, 235, 117);	
          }}>Push Notification</MenuItem>
          <MenuItem className="menu-item" onClick={() => {
            this.changeAnswerSplit(80, 200, 100);	
          }}>Voice</MenuItem>
        </DropdownButton>
      </div>
		)
	};
};