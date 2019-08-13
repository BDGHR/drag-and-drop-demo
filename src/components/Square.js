import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Constants';
import redSquare from '../img/redSquare.jpg';

function Square({ x, y, bigArr, hasTile }) {
    const [{ isOver, canDrop }, drop] = useDrop({
		accept: ItemTypes.TILE,
		drop: () => ({x: x, y: y}),
		collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
		}),
    })

    const inner = document.getElementsByClassName("inner")[0];
    const domRect = inner.getBoundingClientRect();

    let backgroundColor = "white";
    let zIndex = 0;
    const isActive = canDrop && isOver;
    let border = "1px solid black";
    // let hasTile = tilePositions.map(tile => {
    //     return tile[0] === x && tile[1] === y;
    // })
    // hasTile = hasTile.reduce((a, b) => a || b);
    // console.log("hasTile", hasTile);

    const foundTileIndex = bigArr.findIndex(tile => {
        return tile[0] === x && tile[1] === y;
    })
    // console.log(bigArr[foundTileIndex]);
    
    if (isActive) {
        backgroundColor = "green";
    }
    if (isOver && hasTile) {
        backgroundColor = "#B10603";
        zIndex = 100;
    }

    return(
        <div className="square"
            ref={drop}
            style={{
                position: 'absolute',
                backgroundColor,
                zIndex,
                border,
                top: y*50,
                left: x*50+domRect.left,
            }}>
            <p>[{x},{y}]</p>
            <img src="" width="30" />
        </div>
    )
}

export default Square;