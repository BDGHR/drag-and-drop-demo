import React from 'react';
import './App.css';
import Grid from './components/Grid';
import TileRack from './components/TileRack';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom';

let tilePositions = [[0, 0, 'a'], [1, 1, 'x'], [2, 2, 'u'], [3, 3, null], [4, 4, 's'], [5, 5, 'z'], [6, 6, 'q']];

let bigStr = "hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________"
bigStr = "elephant_______tacos__________space__________fishman________calico";
const fillArr = new Array(225).fill("_");
bigStr = bigStr + fillArr.slice(0, 225-bigStr.length).join("");
const strArr = bigStr.split("");
const bigArr = [];
let i = 0;
for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 15; x++) {
        bigArr.push([x, y, strArr[i], i, false]);
        i++;
    }
}
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
for (let i = 0; i < 7; i++) {
  bigArr.push([i+16, 8, alphabet.charAt(Math.floor(Math.random()*26)), 225+i, true]);
}
console.log(bigArr);

export function moveTile(toX, toY, newIndex, letter, oldIndex) {
  console.log("before tile move", bigArr);
  bigArr[newIndex] = [toX, toY, letter, newIndex, true];
  bigArr[oldIndex] = [bigArr[oldIndex][0], bigArr[oldIndex][1], "_", oldIndex, false]
  emitChange()
  console.log("after tile move", bigArr);

  getWords(bigArr);
}

function getWords(bigArr) {
  let horizArr = [];
  bigArr.forEach(item => {
    horizArr.push(item[2]);
  })
  const horizStr = horizArr.join("");
  console.log("horizontal", horizStr);
  let horizGroups = [];
  for (let i = 0; i < 225; i=i+15) {
    horizGroups.push(horizArr.slice(i, i+15))
  }
  console.log(horizGroups);
  let horizWords = horizGroups.map(group => {
    return group.join("").split("_").filter(word => {
      return word !== ""
    })
  })
  console.log(horizWords);

  let vertArr = [];
  for (let col = 0; col < 15; col++) {
    for (let row = 0; row < 225; row=row+15) {
      vertArr.push(bigArr[col+row][2]);
    }
  }
  const vertStr = vertArr.join("");
  console.log("vertical", vertStr);
  let vertGroups = [];
  for (let i = 0; i < 225; i=i+15) {
    vertGroups.push(vertArr.slice(i, i+15))
  }
  console.log(vertGroups);
  let vertWords = vertGroups.map(group => {
    return group.join("").split("_").filter(word => {
      return word !== ""
    })
  })
  console.log(vertWords);
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
                ReactDOM.render(<DndProvider backend={HTML5Backend}>
                  <div className="gridAndRack">
                    <Grid bigArr={bigArr} />
                    <TileRack bigArr={bigArr} />
                  </div>
                  </DndProvider>, element))}
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
