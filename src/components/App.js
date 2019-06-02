import React, { Component } from 'react';
import Map from './Map/Map';
import RouteEditor from './RouteEditor/RouteEditor';
import PointInput from './RouteEditor/PointInput';
import PointList from './RouteEditor/PointList';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.setMapRef = this.setMapRef.bind(this);
    this.setPointCoordinates = this.setPointCoordinates.bind(this);
    this.movePoint = this.movePoint.bind(this);
    this.addPoint = this.addPoint.bind(this);
    this.deletePoint = this.deletePoint.bind(this);
    this.state = {
      points: []
    };
  }

  render() {
    const titles = this.state.points.map(point => point.title);

    return (
      <div className="app-container">
        <RouteEditor>
          <PointInput addPoint={this.addPoint}/>
          <PointList titles={titles} movePoint={this.movePoint} addPoint={this.addPoint} deletePoint={this.deletePoint} onSortEnd={this.movePoint}/>
        </RouteEditor>
        <Map points={this.state.points} onPointDrag={this.setPointCoordinates} setMapRef={this.setMapRef}/>
      </div>
    );
  }

  movePoint({oldIndex, newIndex}) {
    const array = this.state.points.slice();
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);

    this.setState({points: array});
  }

  setMapRef(mapRef) {
    this.map = mapRef;
  }

  setPointCoordinates(index, coordinates) {
    const points = this.state.points.slice();
    points[index].coordinates = coordinates;

    this.setState({points});
  }

  addPoint(title) {
    const point = {title, coordinates: this.map.getCenter()};

    this.setState({points: this.state.points.concat([point])});
  }

  deletePoint(index) {
    const points = this.state.points.slice();

    points.splice(index, 1);
    this.setState({points});
  }
}

export default App;