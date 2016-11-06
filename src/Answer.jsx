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
  
  //splitAnswer contains all of the string splitting logic

  splitAnswer(str, min, max, ideal) {
    const output = { snippet: '', continued: '' };
    let pieces = '';
    let punctuation = ['.','?','!',':',';',','];

    //Notify user if their answer does not meet the minimum length for selected format
    if (str.length < min) {
      return this.setState({ 
        snippet: 'Answer not long enough for this format!', 
        continued: 'Please elaborate...',
      });
    }

    //Loop through the string, adding breakpoints after punctuation. This way we can split the string into an array of strings while maintaining appropriate punctuation
    for (var i=0; i<str.length; i++){
      pieces += str[i];
      if (punctuation.includes(str[i])) {
        pieces += '\n'
      }
    }
    
    pieces = pieces.split('\n');

    //Edge case for answers lacking punctuation and low character maximums
    if (pieces.length === 1 || pieces[0].length > max) {
      pieces = pieces.join('').split(/(\s)/);
      //Edge case for an 'answer' that is just a string of letters.
      if (pieces.length === 1) {
        return this.setState({ 
          snippet: str.join('').slice(0, ideal) + '...', 
          continued: str.join('').slice(ideal+1),
        });
      }
    }

    //Loop through pieces array, main logic for generating snippet of appropriate length
    for (var j=0; j<pieces.length; j++){
      let range = Math.abs(output.snippet.length - ideal);
      let iteration = output.snippet += pieces[j];
      if (range > iteration.length || iteration.length < min) {
        output.snippet = iteration;
      } else {
        output.continued = pieces.join('').slice(output.snippet.length);
        if (!punctuation.includes(output.snippet[output.snippet.length-1])) {
          output.snippet += '...';
        }
        break;
      }
    }
    
    //Final edge case check for long strings. The snippet is sliced by the space nearest to ideal.
    if (output.snippet.length > max) {
      for (var k=ideal; k<output.snippet.length; k++){
        if (output.snippet[k] === ' ') {
          let temp = output.snippet.slice(k);
          output.snippet = output.snippet.slice(0, k) + '...';
          output.continued = temp += output.continued;
        }
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