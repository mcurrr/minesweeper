import React, { Component } from 'react';
import { map } from 'lodash';

import { removeCell } from './utils';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: props.array
    }
  }

  onChange = cell => {
    if (!cell || !cell.id) return;

    const { array } = this.state;
    const newArray = removeCell(array, cell.id, cell.type);

    this.setState({ array: newArray });
  }

  render() {
    const { array } = this.state;

    return (
      <div className="app">
        {map(array, (row, index) =>
        <div key={index} className="row">
          {map(row, (cell, anotherIndex) =>
            <div
              key={anotherIndex}
              onClick={() => this.onChange(cell)}
              className={`cell a-${cell.type}`}
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
