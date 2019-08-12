import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Constants';
import { moveTile } from '../App';

function Square({ x, y, tilePositions }) {
    const [{ isOver }, drop] = useDrop({
		accept: ItemTypes.TILE,
		drop: () => ({x: x, y: y}),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
    })

    return(
        <div className="square"
            ref={drop}
            style={{
                position: 'relative',
                top: y,
                left: x
            }}>
            <p>[{x},{y}]</p>
        </div>
    )
}

export default Square;