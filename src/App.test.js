import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow , mount } from 'enzyme';
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
			['X', '', ''],
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
			['X', '', ''],
			['', '', ''],
			['', '', '']
		], 
		arr1 = [
			['X', 'O', ''],
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
			['X', 'O', ''],
			['', '', ''],
			['', '', '']
		], 
		arr1 = [
			['X', 'O', ''],
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

