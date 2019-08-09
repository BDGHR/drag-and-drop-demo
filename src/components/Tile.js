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
    
    const inner = document.getElementsByClassName("inner")[0];
    const domRect = inner.getBoundingClientRect();

    return(
        <div className="tile" 
        ref={drag}
        style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 14,
            cursor: 'move',
            backgroundColor: 'red',
            position: "absolute",
            top: y*54+domRect.top,
            left: x*53+domRect.left,
            zIndex: 100
        }}>
            <p>[{x}, {y}]</p>
        </div>
    )
}