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
    const value = parseInt(event.key, 10);

    if (!this.checkValue(sudoku, focus, value)) {
      return;
    }
    
    this.setValueInSudoku(sudoku, focus, value);

    this.setState({ sudoku: sudoku });
  }

  setValueInSudoku = (sudoku, focus, value) => {
    const square = sudoku[focus.x][focus.y];

    square[focus.value.x][focus.value.y] = value;
  }

  getValueInSudoku = (sudoku, focus) => {
    const square = sudoku[focus.x][focus.y];

    return square[focus.value.x][focus.value.y];
  }

  checkValue = (sudoku, focus, value) => {
    if (!Number.isInteger(value)) {
      return false;
    }

    return this.checkValueInSquare(value, sudoku, focus) 
      && this.checkValueVertically(value, sudoku, focus) 
      && this.checkValueHorizontally(value, sudoku, focus);
  }

  checkValueInSquare = (number, sudoku, focus) => {
    const square = sudoku[focus.x][focus.y];

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
    const sudoku = [...this.state.sudoku];
    const focus = {
      x: 0,
      y: 0,

      value: {
        x: 0,
        y: 0
      }
    }
    
    this.doSolve(sudoku, focus);

    this.setState({ sudoku: sudoku });
  }

  doSolve = (sudoku, focus) => {
    if (!focus) {
      return true;
    }

    if (this.getValueInSudoku(sudoku, focus) !== 0) {
      return this.doSolve(sudoku, this.getNextFocus(focus));
    }

    for (let value = 1; value < 10; value++) {
      if (this.checkValue(sudoku, focus, value)) {
        this.setValueInSudoku(sudoku, focus, value);
        return this.doSolve(sudoku, this.getNextFocus(focus));
      }
    }

    return false;
  }

  getNextFocus = (focus) => {
    if (focus.value.x < 2) {
      focus.value.x ++;
      return focus;

    } else if (focus.value.y < 2) {
      focus.value.y++;
      focus.value.x = 0;
      return focus;

    } else if (focus.x < 2) {
      focus.x++;
      focus.value.x = 0;
      focus.value.y = 0;
      return focus;

    } else if (focus.y < 2) {
      focus.y++;
      focus.x = 0;
      focus.value.x = 0;
      focus.value.y = 0;
      return focus;
    }

    return null;
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
