import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
	ReactDOM.unmountComponentAtNode(div);
});

describe('App', () => {
	const wrapper = shallow(
		<App />
	);
	let param = {
		target: {
			classList: {
				contains: jest.fn(),
				add: jest.fn()
			},
			dataset: {
				row: 0,
				column: 0
			}
		}
	};

	it('should render correctly', () => {		
		expect(shallowToJson(wrapper)).toMatchSnapshot();
	});

	it('click on first tile', () => {
		const arr = [
			['', '', ''],
			['', '', ''],
			['', '', '']
		], 
		arr1 = [
			[1, '', ''],
			['', '', ''],
			['', '', '']
		];

		expect(wrapper.state().currentValue).toEqual(1);
		expect(wrapper.state().box).toEqual(arr);
		wrapper.find('td').first().simulate('click', param );	
		expect(wrapper.state().currentValue).toEqual(0);
		expect(wrapper.state().box).toEqual(arr1);
	});

	it('click on second tile upon clicking first tile', () => {
		const arr = [
			[1, '', ''],
			['', '', ''],
			['', '', '']
		], 
		arr1 = [
			[1, 0, ''],
			['', '', ''],
			['', '', '']
		];

		param.target.dataset.column = 1; // second tile (0, 1)

		expect(wrapper.state().currentValue).toEqual(0);
		expect(wrapper.state().box).toEqual(arr);
		wrapper.find('td').at(2).simulate('click', param );	
		expect(wrapper.state().currentValue).toEqual(1);
		expect(wrapper.state().box).toEqual(arr1);
	});
	
	it('click on first tile again', () => {
		const arr = [
			[1, 0, ''],
			['', '', ''],
			['', '', '']
		], 
		arr1 = [
			[1, 0, ''],
			['', '', ''],
			['', '', '']
		];

		// element already has a class assigned i.e a value assigned to it
		param.target.classList.contains = jest.fn().mockReturnValueOnce(true);

		expect(wrapper.state().currentValue).toEqual(1);
		expect(wrapper.state().box).toEqual(arr);
		wrapper.find('td').first().simulate('click', param);	
		expect(wrapper.state().currentValue).toEqual(1);
		expect(wrapper.state().box).toEqual(arr1);
	});
});

// I didn't know if covering every single branch in the code is going to be 
// exhaustive. Covered one scenario each from the checkWinner method
// (horizontal, vertical, diagonal)

describe('Check Winner', () => {
	const wrapper = shallow(
		<App />
	);
	let param = {
		target: {
			classList: {
				contains: jest.fn(),
				add: jest.fn()
			},
			dataset: {
				row: 0,
				column: 0
			}
		}
	},
	arr = [
		[1, 1, ''],
		[0, 0, ''],
		['', '', '']
	], 
	arr1 = [
		[1, 1, 1],
		[0, 0, ''],
		['', '', '']
	];;

	jest.spyOn(window, 'alert').mockImplementation(() => {});

	it('When 3 Xs go across horizontally', () => {
		wrapper.setState({ box: arr });
		wrapper.setState({ currentValue: 1 });
		expect(wrapper.state().box).toEqual(arr);
		param.target.dataset.row = 0;
		param.target.dataset.column = 2;
		wrapper.find('td').at(3).simulate('click', param);

		expect(wrapper.state().box).toEqual(arr1);
		expect(window.alert).toBeCalledWith('Winner is X');
	});

	it('When 3 Os go down vertically', () => {
		arr = [
			[0, 1, 1],
			[0, 1, ''],
			['', '', '']
		]; 
		arr1 = [
			[0, 1, 1],
			[0, 1, ''],
			[0, '', '']
		];

		wrapper.setState({ box: arr });
		wrapper.setState({ currentValue: 0 });
		expect(wrapper.state().box).toEqual(arr);
		param.target.dataset.row = 2;
		param.target.dataset.column = 0;
		wrapper.find('td').at(7).simulate('click', param);

		expect(wrapper.state().box).toEqual(arr1);
		expect(window.alert).toBeCalledWith('Winner is O');
	});

	it('When 3 Os go down left diagonally', () => {
		arr = [
			[1, 1, 0],
			[1, 0, ''],
			['', '', '']
		]; 
		arr1 = [
			[1, 1, 0],
			[1, 0, ''],
			[0, '', '']
		];

		wrapper.setState({ box: arr });
		wrapper.setState({ currentValue: 0 });
		expect(wrapper.state().box).toEqual(arr);
		param.target.dataset.row = 2;
		param.target.dataset.column = 0;
		wrapper.find('td').at(7).simulate('click', param);

		expect(wrapper.state().box).toEqual(arr1);
		expect(window.alert).toBeCalledWith('Winner is O');
	});
});


