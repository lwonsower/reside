import React, { Component } from 'react';

import Dropdown from './Dropdown.jsx';
import Snippet from './Snippet.jsx';
import Continued from './Continued.jsx';

export default class Answer extends Component {
	constructor(props) {
    super(props);
    this.state = {
      fullAnswer: this.props.resp,
      snippet: '',
      continued: '',
    }

    this.splitAnswer = this.splitAnswer.bind(this);
	};
  
  splitAnswer(str, min, max, ideal) {
    console.log("inside split answers")
    const output = { snippet: '', continued: '' };
    // str.length < min ? alert("Answer must be at least "+min+" characters!") : null;
    str = str.split(/([.!:?;])/);
    //For answers lacking punctuation and low character maximums
    if (str.length === 1 || str[0].length > max) {
      str = str.join('').split(/(\s)/);
      //Edge case for an 'answer' that is just a string of letters.
      if (str.length === 1) {
        return str.join('').slice(0, min-3) + '...';
      }
    }
    for (var i=0; i<str.length; i++){
        let range = Math.abs(output.snippet.length - ideal);
        let iteration = output.snippet += str[i];
      if (range > iteration.length || iteration.length < min) {
        output.snippet = iteration;
      } else {
        output.continued = str.join('').slice(output.snippet.length);
        break;
      }
    }    
    this.setState({ snippet: output.snippet, continued: output.continued });
  };

  render(){
    console.log(this.state);
  	return(
      <div>
        <Dropdown fullAnswer={this.state.fullAnswer}
                  splitAnswer={this.splitAnswer.bind(this)} />
        <div className="answer-div">
          <div className="left-q">
            <h4>Snippet</h4>
            <Snippet snippet={this.state.snippet} />
          </div>

          <div className="right-q">
            <h4>Continued</h4>
            <Continued continued={this.state.continued} />
          </div>
        </div>
      </div>
  	)
  };
};