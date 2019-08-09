import React from 'react';
import Square from './Square';
import Tile from './Tile';

const bigArr = [];
for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 15; x++) {
        bigArr.push([x, y]);
    }
}

function renderSquare(x, y, tilePosition) {
    const isTileHere = tilePosition[0] === x && tilePosition[1] === y
    console.log(isTileHere);
    const piece = isTileHere ? <Tile x={x} y={y} /> : null
  
    return (<div><Square x={x} y={y} />{piece}</div>);
}

function Grid({ tilePosition }) {
    return (
            <div className="grid">
                
                {bigArr.map(item => {
                    return renderSquare(item[0], item[1], tilePosition);
                })}
                
            </div>
    )
}

export default Grid;