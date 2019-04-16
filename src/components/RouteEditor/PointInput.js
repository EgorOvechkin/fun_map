import React, { PureComponent } from 'react';
import './styles/PointInput.css'

class RouteEditor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pointTitle: '',
      isValid: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  render() {
    return (
      <input
        className={this.state.isValid ? 'point-input' : 'point-input error'}
        type="text"
        onChange={this.handleChange}
        onKeyDown={this.keyPress}
        placeholder={'Название точки маршрута'}
      />
    );
  }

  handleChange(event) {
    const newValue = event.target.value.trim();

    this.setState({pointTitle: newValue});

    if (!this.state.isValid) {
      this.setState({isValid: newValue !== ''})
    }
  }

  keyPress(event) {
    if (event.key !== 'Enter') {
      return;
    }

    if (!this.state.pointTitle) {
      this.setState({isValid: false});
      return;
    }

    this.props.addPoint(this.state.pointTitle);
    this.setState({pointTitle: ''});
    event.target.value = '';
  }
}

export default RouteEditor;
