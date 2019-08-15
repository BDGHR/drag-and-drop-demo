import React from 'react';
import { ItemTypes, LETTER_TILE_VALUES } from './Constants';
import { useDrag } from 'react-dnd';
import { moveTile } from '../App';

export default function Tile({ x, y, strLetter, bigArr, wipeTileIndex, isFree, rackIndex }) {
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.TILE },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult && !dropResult.hasTile) {
                moveTile(dropResult.x, dropResult.y, bigArr.findIndex(item => {
                    return item[0] === dropResult.x && item[1] === dropResult.y;
                }), strLetter, wipeTileIndex, rackIndex)
            }
        },
      })

    const inner = document.getElementsByClassName("inner")[0];
    const domRect = inner.getBoundingClientRect();

    return(
        <div className="tile" 
        ref={isFree ? drag: null}
        style={{
            opacity: isDragging ? 0.75 : 1,
            fontSize: 14,
            cursor: isFree ? 'move': 'mouse',
            position: "absolute",
            top: y*50,
            left: x*50+domRect.left,
            zIndex: 90,
            backgroundColor: "khaki"
        }}>
            <div className="letter">{strLetter}</div>
            <div className="pointValue">{LETTER_TILE_VALUES[strLetter]}</div>
            
        </div>
    )
}