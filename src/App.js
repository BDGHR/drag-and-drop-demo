import React from 'react';
import './App.css';
import Grid from './components/Grid';
import TileRack from './components/TileRack';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom';

let tilePositions = [[0, 0, 'a'], [1, 1, 'x'], [2, 2, 'u'], [3, 3, null], [4, 4, 's'], [5, 5, 'z'], [6, 6, 'q']];

let bigStr;
// bigStr = "hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________hello__________"
// bigStr = "elephant_______tacos__________space__________fishman________calico";
bigStr = "_________________________________________________________________________________________________________elephant______________a______________c______________o______________saucy"

// add filler (what will become empty squares) to an array, join into string
// then tack it onto bigStr to make it 225-long
const fillArr = new Array(225).fill("_");
bigStr = bigStr + fillArr.slice(0, 225-bigStr.length).join("");

const strArr = bigStr.split("");

// make an array of elements to populate the board
// the format for each element is [xCoord, yCoord, letter/empty, index, isFree boolean, tileRack index]
let bigArr = [];
let i = 0;
for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 15; x++) {
        bigArr.push([x, y, strArr[i], i, false, -1]);
        i++;
    }
}

// add random tiles to the end of the array to be in the tileRack
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
for (let i = 0; i < 7; i++) {
  bigArr.push([i+16, 7, alphabet.charAt(Math.floor(Math.random()*26)), 225+i, true, i]);
}
console.log(bigArr);

// function returnTiles() {
//   console.log("hello from return #1");
//   for (let i = 0; i < bigArr.length; i++) {
//     // if there's a tileRack index (not -1) and tile is on board
//     if (bigArr[i][5] >= 0 && bigArr[i][3] < 225) {
//       console.log("hello from return #2", bigArr[i][3]);
//       for (let j = 225; j < 232; j++) {
//         if (bigArr[j][2] === "_") {
//           // when setting a square here and in moveTile()
//           // the format is [xCoord, yCoord, letter/empty, index, isFree boolean, tileRack index]
          
//           // tile(s) on board move(s) to rack
//           bigArr[j] = [bigArr[j][0], 7, bigArr[i][2], bigArr[j][3], true, bigArr[i][5]];
//           // remove tile(s) from board
//           bigArr[i] = [bigArr[i][0], bigArr[i][1], "_", bigArr[i][3], false, -1];
//           emitChange();
//         }
//       }
      
//       console.log(bigArr);
//     }
//   }
// }

function returnTiles() {
  console.log("hello from return #1");
  for (let i = 0; i < bigArr.length; i++) {
    // if there's a tileRack index (not -1) and tile is on board
    if (bigArr[i][5] >= 0 && bigArr[i][3] < 225) {
      // console.log("hello from return #2", bigArr[i][3]);
      for (let j = 225; j < 232; j++) {
        if (bigArr[j][2] === "_") {
          // when setting a square here and in moveTile()
          // the format is [xCoord, yCoord, letter/empty, index, isFree boolean, tileRack index]
          
          // tile(s) on board move(s) to rack
          bigArr[j] = [bigArr[j][0], 7, bigArr[i][2], bigArr[j][3], true, bigArr[i][5]];
          // remove tile(s) from board
          bigArr[i] = [bigArr[i][0], bigArr[i][1], "_", bigArr[i][3], false, -1];
          // emitChange();
        }
      }
    }
  }

  // rearrange tileRack
  let tileRack = bigArr.slice(225, 232);
  
  // console.log("before sort", tileRack);
  tileRack = tileRack.sort((a, b) => {
    return a[5] > b[5] ? 1 : -1;
  });
  console.log("after sort", tileRack);
  for (let i = 0; i < tileRack.length; i++) {
    bigArr[tileRack[i][5]+225] = [tileRack[i][5]+16, 7, tileRack[i][2], 225+i, tileRack[i][4], tileRack[i][5]];
  }
  // bigArr.splice(225, 7, ...tileRack);
  console.log("after splice", bigArr);
  emitChange();
}

export function moveTile(toX, toY, newIndex, letter, oldIndex, rackIndex) {
  console.log("before tile move", bigArr);

  // when setting a square here and in returnTiles()
  // the format is [xCoord, yCoord, letter/empty, index, isFree boolean, tileRack index]

  // where tile moves to
  bigArr[newIndex] = [toX, toY, letter, newIndex, true, rackIndex];
  // where tile moved from
  bigArr[oldIndex] = [bigArr[oldIndex][0], bigArr[oldIndex][1], "_", oldIndex, false, -1]
  
  // update board
  emitChange()
  console.log("after tile move", bigArr);

  // print rows, columns, and all found words to console
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
    }, 500
  )

  return (
      <div className="App" id="app">
        Drag and drop demo
        <div className="inner">
          
          {setTimeout(
            function() {
              {observe(() =>
                ReactDOM.render(
                <DndProvider backend={HTML5Backend}>
                    <Grid bigArr={bigArr} />
                    <TileRack bigArr={bigArr} returnTiles={returnTiles} />
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
