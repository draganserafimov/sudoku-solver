import React from 'react';
import classes from './Square.css';

const square = (props) => {

    let values = (
        props.values.map((row, rowIndex) => {
            return row.map((column, columnIndex) => {
                let x = -1;
                let y = -1;
                if (props.focus) {
                    x = props.focus.x;
                    y = props.focus.y;
                }

                let key = "value_" + rowIndex + "_" + columnIndex;
                let focusedClass = (rowIndex === x && columnIndex === y) ? classes.focused : classes.notFocused;
                return (
                    <div 
                        className={focusedClass}
                        key={key}
                        x={rowIndex}
                        y={columnIndex}
                        onClick={props.changeFocus}>
                            {column === 0 ? '' : column}
                    </div>
                )
            });
        })
    );

    return (
        <div className={classes.Square}>
            {values}
        </div>
    )
}

export default square;