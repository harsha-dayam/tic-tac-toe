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
		this._checkWinner = this.checkWinner.bind(this);
	}

	checkWinner(boxCopy) {
		let sum = "";

		for (let i = 0; i < boxCopy.length; i++) { // check for horizontal win
			sum = boxCopy[i][0] + boxCopy[i][1] + boxCopy[i][2];
			if (sum === 3) {
				return 'X';
			} else if (sum === 0) {
				return 'O'
			}
		}

		for (let i = 0; i < boxCopy.length; i++) { // check for vertical win
			sum = boxCopy[0][i] + boxCopy[1][i] + boxCopy[2][i];
			if (sum === 3) {
				return 'X';
			} else if (sum === 0) {
				return 'O'
			}
		}

		// check for diagonal win
		sum = boxCopy[0][0] + boxCopy[1][1] + boxCopy[2][2];
		if (sum === 3) {
			return 'X';
		} else if (sum === 0) {
			return 'O'
		}

		sum = boxCopy[2][0] + boxCopy[1][1] + boxCopy[0][2];
		if (sum === 3) {
			return 'X';
		} else if (sum === 0) {
			return 'O'
		}

		return '';
	}

	handleClick(e) {
		const { currentValue, box } = this.state,
			el = e.target,
			boxCopy = JSON.parse(JSON.stringify(box)), // deep cloning since its an array or arrays
			x = el.dataset.row,
			y = el.dataset.column;
		let winner;

		if (!el.classList.contains("value1") && !el.classList.contains("value0")) {
			el.classList.add("value" + currentValue);
			boxCopy[x][y] = currentValue;

			winner = this.checkWinner(boxCopy);
			if (winner) {
				alert(`Winner is ${winner}`);
			}

			this.setState({
				currentValue: currentValue ^ 1,
				box: boxCopy
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
