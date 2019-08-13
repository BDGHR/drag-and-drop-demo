import React from 'react';
import Square from './Square';
import Tile from './Tile';

const bigArr = [];
for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 15; x++) {
        bigArr.push([x, y]);
    }
}

function renderSquare(x, y, tilePositions) {
    let isTileHere;
    for (let i = 0; i < tilePositions.length; i++) {
        isTileHere = tilePositions[i][0] === x && tilePositions[i][1] === y;
        if (isTileHere) break;
    }

    const piece = isTileHere ? <Tile x={x} y={y} tilePositions={tilePositions} /> : null
  
    return (<div><Square x={x} y={y} tilePositions={tilePositions} hasTile={isTileHere}/>{piece}</div>);
}

function Grid({ tilePositions }) {
    return (
            <div className="grid">
                
                {bigArr.map(item => {
                    return renderSquare(item[0], item[1], tilePositions);
                })}
                
            </div>
    )
}

export default Grid;