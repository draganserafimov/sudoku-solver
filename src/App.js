import React, { Component } from 'react';
import './App.css';

import Square from './Square/Square'
import classes from './App.css';

class App extends Component {
  state = {
    sudoku: 
    [
      [     
        [
          [1, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],       
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 2, 0]
        ],       
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ]
      ],
      [      
        [
          [0, 2, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],       [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],       [
          [0, 4, 0],
          [0, 0, 0],
          [0, 0, 0]
        ]
      ],
      [      
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],       [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],       
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 9, 0]
        ]
      ]
    ],

    focus: {
      x: 2,
      y: 2,

      value: {
        x: 1,
        y: 0
      }
    }
  }

  changeFocusHandler = (event, squareRowIndex, squareColumnIndex) => {
    let valueRowIndex = parseInt(event.target.attributes.x.nodeValue, 10);
    let valueColumnIndex = parseInt(event.target.attributes.y.nodeValue, 10);

    const focus = {...this.state.focus};

    focus.x = squareRowIndex;
    focus.y = squareColumnIndex;

    focus.value.x = valueRowIndex;
    focus.value.y = valueColumnIndex;

    this.setState({ focus: focus });
  }

  setValueHandler = (event) => {
    const value = parseInt(event.key);
    if (!Number.isInteger(value)) {
      return;
    }

    const sudoku = [...this.state.sudoku];
    const square = sudoku[this.state.focus.x][this.state.focus.y];

    square[this.state.focus.value.x][this.state.focus.value.y] = event.key;

    this.setState({ sudoku: sudoku });
  }

  render() {

    let squares = (
      this.state.sudoku.map((row, rowIndex) => {
          return row.map((column, columnIndex) => {
              let x = this.state.focus.x;
              let y = this.state.focus.y; 

              let key = "square_" + rowIndex + "_" + columnIndex;
              return <Square
                  key={key}
                  focus={(rowIndex === x && columnIndex === y) ? this.state.focus.value : null}
                  values={column}
                  changeFocus={(event) => this.changeFocusHandler(event, rowIndex, columnIndex)}></Square>
          });
      })
    );

    return (
      <div className={classes.App}
        onKeyDown={(event) => this.setValueHandler(event)}
        tabIndex="0">
        <div className={classes.Sudoku}>
          {squares}
        </div>
      </div>
    );
  }
}

export default App;
