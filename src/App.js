import React, { Component } from 'react';
import classes from './App.css';

import Square from './Square/Square'

class App extends Component {
  state = {
    sudoku: 
    [
      [     
        [
          [0, 2, 0],
          [0, 0, 4],
          [0, 0, 0]
        ],       
        [
          [7, 0, 0],
          [0, 0, 0],
          [9, 1, 0]
        ],       
        [
          [3, 0, 0],
          [0, 0, 2],
          [0, 0, 0]
        ]
      ],
      [      
        [
          [0, 0, 1],
          [3, 0, 0],
          [0, 0, 9]
        ],       [
          [0, 8, 4],
          [0, 0, 0],
          [5, 6, 0]
        ],       [
          [9, 0, 0],
          [0, 0, 8],
          [0, 2, 0]
        ]
      ],
      [      
        [
          [0, 0, 0],
          [5, 0, 0],
          [0, 0, 6]
        ],       [
          [0, 7, 6],
          [0, 0, 0],
          [0, 0, 9]
        ],       
        [
          [0, 0, 0],
          [7, 0, 0],
          [0, 4, 0]
        ]
      ]
    ],

    focus: {
      x: -1,
      y: -1,

      value: {
        x: -1,
        y: -1
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
    const sudoku = [...this.state.sudoku];
    const focus = {...this.state.focus};

    if (!this.checkValue(event.key, sudoku, focus)) {
      return;
    }
    
    const square = sudoku[this.state.focus.x][this.state.focus.y];

    square[this.state.focus.value.x][this.state.focus.value.y] = parseInt(event.key, 10);

    this.setState({ sudoku: sudoku });
  }

  checkValue = (key, sudoku, focus) => {
    const value = parseInt(key, 10);
    if (!Number.isInteger(value)) {
      return false;
    }

    return this.checkValueInSquare(value, sudoku) 
      && this.checkValueVertically(value, sudoku, focus) 
      && this.checkValueHorizontally(value, sudoku, focus);
  }

  checkValueInSquare = (number, sudoku) => {
    const square = sudoku[this.state.focus.x][this.state.focus.y];

    var valid = !square.some((row) => {
      return row.some((value) => {
        return number === value;
      });
    });

    return valid;
  }

  checkValueVertically = (number, sudoku, focus) => {
    let columnSquare = sudoku.map((row) => { 
      return row[focus.y]; 
    });

    return columnSquare.every((square, squareIndex) => {
      if (squareIndex === focus.x) {
        return true;
      }

      let column = square.map((row) => {
        return row[focus.value.y];
      });
      
      return !column.includes(number);
    });
  }

  checkValueHorizontally = (number, sudoku, focus) => {
    let rowSquare = sudoku[focus.x];

    return rowSquare.every((square, squareIndex) => {
      if (squareIndex === focus.y) {
        return true;
      }

      let column = square[focus.value.x];

      return !column.includes(number);
    });
  }

  solve = () => {
    console.log("yo");
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
        <button className={classes.Solve}
          onClick={() => this.solve()}>solve</button>
      </div>
    );
  }
}

export default App;
