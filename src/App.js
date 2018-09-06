import React, { Component } from 'react';
import { map } from 'lodash';

import { removeCell, fillArray, dropDownArray } from './utils';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: props.array,
      refilled: true
    }
  }

  refill = () => {
    const { array } = this.state;
    const refilled = fillArray(array);
    this.setState({ array: refilled, refilled: true });
  }

  drop = () => {
    const { array } = this.state;
    const dropped = dropDownArray(array);
    this.setState({ array: dropped }, () => setTimeout(this.refill, 500));
  }

  onChange = cell => {
    if (!cell || !cell.id || !this.state.refilled) return;

    this.setState({ refilled: false });

    const { array } = this.state;
    const trimmed = removeCell(array, cell.id, cell.type);

    this.setState({ array: trimmed }, () => setTimeout(this.drop, 500));
  }

  render() {
    const { array, refilled } = this.state;

    return (
      <div className="app">
        {map(array, (row, index) =>
        <div key={index} className="row">
          {map(row, (cell, anotherIndex) =>
            <div
              key={anotherIndex}
              onClick={() => this.onChange(cell)}
              className={`cell a-${cell.type} ${!refilled ? 'blocked' : ''}`}
            >
              {cell.type}
            </div>
          )}
        </div>)}
      </div>
    );
  }
}

export default App;
