import React from 'react';
import './App.css';
import Grid from './components/Grid';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom';

let tilePosition = [0, 0];

export function moveTile(toX, toY) {
  tilePosition = [toX, toY]
  emitChange()
  console.log(toX, toY, tilePosition)
}

let observer = null

function emitChange() {
  observer(tilePosition)
}

export function observe(o) {
//   if (observer) {
//     throw new Error('Multiple observers not implemented.')
//   }

  observer = o
  emitChange()
}

export function canMoveTile(toX, toY) {
    const [x, y] = tilePosition
    const dx = toX - x
    const dy = toY - y
  
    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    )
}

function App() {
  let element;
  setTimeout (
    function() {
      element = document.getElementsByClassName("inner")[0];
      console.log(element);
    }, 1000
  )

  return (
      <div className="App" id="app">
        Drag and drop demo
        <div className="inner">
          
          {setTimeout(
            function() {
              {observe(tilePosition =>
                ReactDOM.render(<DndProvider backend={HTML5Backend}><Grid tilePosition={tilePosition} /></DndProvider>, element))}
            }, 1200
          )}
          
          
        </div> 
        {/* <div>
        <DndProvider backend={HTML5Backend}><Tile /></DndProvider>
        </div>      */}
      </div>
    
  );
}

export default App;
