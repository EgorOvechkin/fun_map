import React from 'react';
import ReactDOM from 'react-dom';
import PointInput from '../../components/RouteEditor/PointInput';
import {shallow} from 'enzyme';

let wrapper;
beforeEach(() => wrapper = shallow(<PointInput />));

describe('onBlur', () => {
  it('changes isValid from false to true', () => {
    wrapper.simulate('focus');
    wrapper.setState({isValid: false});
    wrapper.simulate('blur');
    expect(wrapper.state('isValid')).toBeTruthy();
  });

  it(`doesn't change isValid when it is true`, () => {
    wrapper.setState({isValid: true});
    wrapper.simulate('focus');
    wrapper.simulate('blur');
    expect(wrapper.state('isValid')).toBeTruthy();
  });
});

describe('handleChange', () => {


  describe('when value is not empty', () => {
    it('saves input value', () => {
      const newValue = 'point title';

      wrapper.simulate('change', {target: {value: newValue}});
      expect(wrapper.state('pointTitle')).toBe(newValue);
    });
  });

  describe('when isValid is false and new value is empty string', () => {
    it(`sets isValid as false and pointTitle as ''`, () => {
      const newValue = '   ';
      wrapper.setState({isValid: false, pointTitle: 'old point title'});

      wrapper.simulate('change', {target: {value: newValue}});
      expect(wrapper.state('isValid')).toBeFalsy();
      expect(wrapper.state('pointTitle')).toBe('');
    });
  });

  describe('when isValid is false and new value is not empty string', () => {
    it('sets isValid as true and saves new value', () => {
      const newValue = 'new point title';
      wrapper.setState({isValid: false, pointTitle: 'old point title'});

      wrapper.simulate('change', {target: {value: newValue}});
      expect(wrapper.state('isValid')).toBeTruthy();
      expect(wrapper.state('pointTitle')).toBe(newValue);
    });
  });

  describe('when isValid is true', () => {
    it('saves new value', () => {
      const newValue = 'new point title';
      wrapper.setState({isValid: true, pointTitle: 'old point title'});

      wrapper.simulate('change', {target: {value: newValue}});
      expect(wrapper.state('isValid')).toBeTruthy();
      expect(wrapper.state('pointTitle')).toBe(newValue);
    });
  });
});

describe('keyPress', () => {
  describe('when key is not Enter', () => {
    it('does nothing', () => {
      const event = {key: 'Up'};
      const oldState = {isValid: true, pointTitle: 'point'};

      wrapper.setState(oldState);
      wrapper.simulate('keydown', event);
      expect(wrapper.state()).toMatchObject(oldState);
    });
  });

  describe('when key is Enter', () => {
    describe('when title is empty', () => {});
    describe('when title is not empty', () => {});
  });
});
