import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Constants';

function Square({ x, y, tilePositions }) {
    const [{ isOver, canDrop }, drop] = useDrop({
		accept: ItemTypes.TILE,
		drop: () => ({x: x, y: y}),
		collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
		}),
    })

    let backgroundColor = "white";
    let zIndex = 0;
    const isActive = canDrop && isOver;
    let border = "1px solid black";
    let hasTile = tilePositions.map(tile => {
        return tile[0] === x && tile[1] === y;
    })
    hasTile = hasTile.reduce((a, b) => a || b);
    // console.log(hasTile);
    
    if (isActive) {
        backgroundColor = "green";
    }
    if (isOver && hasTile) {
        backgroundColor = "red";
        border = "1 px solid red'"
        zIndex = 100;
    }

    return(
        <div className="square"
            ref={drop}
            style={{
                position: 'relative',
                top: y,
                left: x,
                backgroundColor,
                zIndex,
                border
            }}>
            <p>[{x},{y}]</p>
        </div>
    )
}

export default Square;