import React from 'react';
import Square from './Square';
import Tile from './Tile';

export function renderSquare(x, y, letter, index, bigArr, isFree, rackIndex) {
    let isTileHere = letter === "_" ? false : true;
    // console.log("rackIndex in RS", rackIndex);
    const piece = isTileHere ? <Tile x={x} y={y} strLetter={letter} bigArr={bigArr} bigArr={bigArr} wipeTileIndex={index} isFree={isFree} rackIndex={rackIndex} /> : null
  
    return (<div><Square x={x} y={y} bigArr={bigArr} hasTile={isTileHere}/>{piece}</div>);
}

function Grid({ bigArr }) {
    return (
            <div className="grid">
                
                {bigArr.slice(0,225).map(item => {
                    return renderSquare(item[0], item[1], item[2].toUpperCase(), item[3], bigArr, item[4], item[5]);
                })}
                
            </div>
    )
}

export default Grid;