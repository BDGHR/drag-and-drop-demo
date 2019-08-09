import React from 'react';
import { ItemTypes } from './Constants';
import { useDrag } from 'react-dnd';

export default function Tile({ x, y }) {
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.TILE },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      })

    return(
        <div className="tile" 
        ref={drag}
        style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 14,
            cursor: 'move',
            backgroundColor: 'red',
            position: "absolute",
            top: y*54+0,
            left: x*53+150,
            zIndex: 100
        }}>
            <p>[{x}, {y}]</p>
        </div>
    )
}