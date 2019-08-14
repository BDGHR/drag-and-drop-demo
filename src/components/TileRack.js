import React from 'react';
import Tile from './Tile';
import Square from './Square';

function renderSquare(x, y, letter, index, bigArr, isFree) {
    let isTileHere = letter === "_" ? false : true;
    const piece = isTileHere ? <Tile x={x} y={y} strLetter={letter} bigArr={bigArr} bigArr={bigArr} wipeTileIndex={index} isFree={isFree} /> : null
  
    return (<div><Square x={x} y={y} bigArr={bigArr} hasTile={isTileHere}/>{piece}</div>);
}

export default function TileRack({ bigArr }) {

    return (
        <div>
            {bigArr.slice(225, bigArr.length).map(item => {
                return renderSquare(item[0], item[1], item[2].toUpperCase(), item[3], bigArr, item[4]);
            })}
        </div>
    )
}