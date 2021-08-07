import { useState, useEffect } from 'react';
import { Sprite, Stage } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import picture0 from 'assets/images/slidepuzzle/Picture0.png';
import picture1 from 'assets/images/slidepuzzle/Picture1.png';
import picture2 from 'assets/images/slidepuzzle/Picture2.png';
import picture3 from 'assets/images/slidepuzzle/Picture3.png';
import picture4 from 'assets/images/slidepuzzle/Picture4.png';
import picture5 from 'assets/images/slidepuzzle/Picture5.png';
import picture6 from 'assets/images/slidepuzzle/Picture6.png';
import picture7 from 'assets/images/slidepuzzle/Picture7.png';
import picture8 from 'assets/images/slidepuzzle/Picture8.png';

const OPTIONS = {
  backgroundColor: 0x1099bb,
  style: {
    transform: 'scale 1.1',
  },
};

const picsArr = [
  picture0,
  picture1,
  picture2,
  picture3,
  picture4,
  picture5,
  picture6,
  picture7,
  picture8,
];

const mockData = [1,2,3,4,5,6,7,8,0];

const swapTiles = (xi, yi, xj, yj, size, arr) => {
  let auxArr = [...arr];
  const temp = auxArr[(xi*size) + yi];
  auxArr[(xi*size) + yi] = auxArr[(xj*size) + yj];
  auxArr[(xj*size) + yj] = temp;

  return [...auxArr];
}

function initBoard(board, size){
  let auxBoard = [...board];
  let i = size * size;
  while(i > 0){
    const j = Math.floor(Math.random() * i);
    const xi = i % size;
    const yi = Math.floor(i / size);
    const xj = j % size;
    const yj = Math.floor(j / size);
    auxBoard = swapTiles(xi, yi, xj, yj, size, auxBoard);
    --i;
  }
  
  return  [...auxBoard];
}

function isSolvable(arr){
  let inversions = 0;
  for(let i = 0; i < arr.length; i++){
    for(let j = (i+1); j < arr.length; j++){
      if(arr[i] > arr[j]) inversions++;
    }
  }
  return (inversions % 2) === 0;
}

function canMoveTile(zi, i){
  console.log((`${zi} - ${i}`))

  const ul = (zi === 0 && (i === 1 || i === 3));
  const uc = (zi === 1 && (i === 0 || i === 4 || i === 2));
  const ur = (zi === 2 && (i === 1 || i === 5));
  const cl = (zi === 3 && (i === 0 || i === 4 || i === 6));
  const cc = (zi === 4 && (i === 1 || i === 5 || i === 3 || i === 7));
  const cr = (zi === 5 && (i === 4 || i === 2 || i === 8));
  const bl = (zi === 6 && (i === 3 || i === 7));
  const bc = (zi === 7 && (i === 6 || i === 4 || i === 8));
  const br = (zi === 8 && (i === 7 || i === 5));

  const res = (ul || uc || ur || cl || cc || cr || bl || bc || br);
  console.log(res);

  return res;
}

function SlidePuzzle() {
  const [board, setBoard] = useState(() => {
    let newBoard = initBoard(mockData, 3);

    while(isSolvable(newBoard)) newBoard = initBoard(mockData, 3);

    return [...newBoard];
  });

  const moveTile = (ind) => {
    const zerInd = board.findIndex(it => it === 0);
    if(canMoveTile(zerInd, ind)){
      const auxArr = [...board];
      auxArr[zerInd] = auxArr[ind];
      auxArr[ind] = 0;

      setBoard([...auxArr]);
    }
  }

  return (
    <Stage 
      options={OPTIONS}
      width={1}
      height={1}
      className="h-screen w-screen"
    >
      {board.map((it, ind) => {
        const auxX = (ind % 3);
        const x = (auxX * 200);
        const auxY = Math.floor(ind / 3);
        const y = (auxY * 200);

        return (
          <Sprite
            key={it}
            x={x}
            y={y}
            width={200}
            height={200}
            texture={new PIXI.Texture.from(picsArr[it])}
            interactive
            click={() => { moveTile(ind) }}
          />
        )
      })}
    </Stage>
  );
}

export default SlidePuzzle;
