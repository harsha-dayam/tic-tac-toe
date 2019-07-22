import React from 'react';
import './App.scss';

class App extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
		// 1 stands for X and 0 stands for O
		currentValue: 1,
		box: [
			['', '', ''],
			['', '', ''],
			['', '', '']
		]
	}
	this._handleClick = this.handleClick.bind(this); 
	this._setUserValue = this.setUserValue.bind(this);  
	this._checkWinner = this.checkWinner.bind(this);
  }

  checkWinner() {
    // console.log(this.state.box);
  }

  setUserValue (el, value) {
	const { box } = this.state,
		  boxCopy = JSON.parse(JSON.stringify(box)),
		  x = el.dataset.row,
		  y = el.dataset.column; // deep cloning since its an array or arrays
		  
	el.classList.add("value" + value);
	boxCopy[x][y] = value;

	this.setState({
	  	box: boxCopy
	}, ()=> {
		this.checkWinner();
	})
  }

  handleClick(e) {
	const { currentValue } = this.state,
		el = e.target;
	debugger;
			
	if (!el.classList.contains("valueX") && !el.classList.contains("valueO")) {
		if (currentValue === 1) {
			this.setUserValue(el, "X");
		} else {
			this.setUserValue(el, "O");
		}

		this.setState({
			currentValue: currentValue ^ 1
		})
	}
  }

  render() {
		return (
			<div className="tic-tac-toe">
				<table id="board">
					<tbody>
						{[[1, 2, 3].map((value, index1) => (
							// 3 rows
							<tr key={index1}>
								{[1, 2, 3].map((value, index2) => 
									// 3 cells in each row
									<td key={index2} data-row={index1} data-column={index2} onClick={this._handleClick}></td>
								)}
							</tr>
						))]}
					</tbody>
				</table>
			</div>
		);
  	}
}  

export default App;
