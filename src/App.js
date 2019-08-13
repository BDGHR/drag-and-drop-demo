import React from 'react';
import './App.css';
import Grid from './components/Grid';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom';

let tilePositions = [[0, 0, 'a'], [1, 1, 'x'], [2, 2, 'u'], [3, 3, null], [4, 4, 's'], [5, 5, 'z'], [6, 6, 'q']];

export function moveTile(toX, toY, index, letter) {
  tilePositions[index] = [toX, toY, letter]
  emitChange()
  console.log(toX, toY, tilePositions)
}

let observer = null

function emitChange() {
  observer(tilePositions)
}

export function observe(o) {
//   if (observer) {
//     throw new Error('Multiple observers not implemented.')
//   }

  observer = o
  emitChange()
}

export function canMoveTile(toX, toY, index) {
    const [x, y] = tilePositions[index]
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
    }, 500
  )

  return (
      <div className="App" id="app">
        Drag and drop demo
        <div className="inner">
          
          {setTimeout(
            function() {
              {observe(() =>
                ReactDOM.render(<DndProvider backend={HTML5Backend}><Grid tilePositions={tilePositions} /></DndProvider>, element))}
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
