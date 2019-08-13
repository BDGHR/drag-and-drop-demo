import React from 'react';
import Square from './Square';
import Tile from './Tile';

function renderSquare(x, y, letter, index, bigArr) {
    // let isTileHere;
    // for (let i = 0; i < tilePositions.length; i++) {
    //     isTileHere = tilePositions[i][0] === x && tilePositions[i][1] === y;
    //     if (isTileHere) break;
    // }
    let isTileHere = letter === "_" ? false : true;
    const piece = isTileHere ? <Tile x={x} y={y} strLetter={letter} bigArr={bigArr} bigArr={bigArr} wipeTileIndex={index} /> : null
  
    return (<div><Square x={x} y={y} bigArr={bigArr} hasTile={isTileHere}/>{piece}</div>);
}

function Grid({ bigArr }) {
    return (
            <div className="grid">
                
                {bigArr.map(item => {
                    return renderSquare(item[0], item[1], item[2].toUpperCase(), item[3], bigArr);
                })}
                
            </div>
    )
}

export default Grid;