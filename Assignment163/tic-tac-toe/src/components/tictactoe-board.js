import React from 'react'
import Cell from './tictactoe-cell';



const component = ({cells,onCellClick,winner,winningCombo}) => {
    return (
        <div className="board">
            
            {
                cells.map( (cell,index)=>  <Cell content={cell}
                                        id={index}
                                         winner={winner} winningCombo={winningCombo}
                                        onCellClick={onCellClick} />)

            }
        </div>
    );
}

export default component;