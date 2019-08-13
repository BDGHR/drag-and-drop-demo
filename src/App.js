import React from 'react';
import './App.css';
import Grid from './components/Grid';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom';

let tilePositions = [[0, 0, 'a'], [1, 1, 'x'], [2, 2, 'u'], [3, 3, null], [4, 4, 's'], [5, 5, 'z'], [6, 6, 'q']];

const bigStr = "hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________"
const strArr = bigStr.split("");
const bigArr = [];
let i = 0;
for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 15; x++) {
        bigArr.push([x, y, strArr[i], i]);
        i++;
    }
}

export function moveTile(toX, toY, newIndex, letter, oldIndex) {
  console.log("before tile move", bigArr);
  bigArr[newIndex] = [toX, toY, letter, newIndex];
  bigArr[oldIndex] = [bigArr[oldIndex][0], bigArr[oldIndex][1], "_", oldIndex]
  emitChange()
  console.log("after tile move", bigArr);
}

let observer = null

function emitChange() {
  observer(bigArr)
}

export function observe(o) {
//   if (observer) {
//     throw new Error('Multiple observers not implemented.')
//   }

  observer = o
  emitChange()
}

// export function canMoveTile(toX, toY, index) {
//     const [x, y] = tilePositions[index]
//     const dx = toX - x
//     const dy = toY - y
  
//     return (
//       (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
//       (Math.abs(dx) === 1 && Math.abs(dy) === 2)
//     )
// }

function App() {
  let element;
  setTimeout (
    function() {
      element = document.getElementsByClassName("inner")[0];
      // (element);
    }, 500
  )

  return (
      <div className="App" id="app">
        Drag and drop demo
        <div className="inner">
          
          {setTimeout(
            function() {
              {observe(() =>
                ReactDOM.render(<DndProvider backend={HTML5Backend}><Grid bigArr={bigArr} /></DndProvider>, element))}
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
