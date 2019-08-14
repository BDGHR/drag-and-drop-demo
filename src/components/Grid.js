import React from 'react';
import Square from './Square';
import Tile from './Tile';

function renderSquare(x, y, letter, index, bigArr, isFree) {
    let isTileHere = letter === "_" ? false : true;
    const piece = isTileHere ? <Tile x={x} y={y} strLetter={letter} bigArr={bigArr} bigArr={bigArr} wipeTileIndex={index} isFree={isFree} /> : null
  
    return (<div><Square x={x} y={y} bigArr={bigArr} hasTile={isTileHere}/>{piece}</div>);
}

function Grid({ bigArr }) {
    return (
            <div className="grid">
                
                {bigArr.slice(0,225).map(item => {
                    return renderSquare(item[0], item[1], item[2].toUpperCase(), item[3], bigArr, item[4]);
                })}
                
            </div>
    )
}

export default Grid;