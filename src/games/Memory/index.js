import { useState, useEffect } from 'react';
import { Sprite, Stage } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import cover from 'assets/images/memorydemo/cover.png';
import seahorse from 'assets/images/memorydemo/seahorse.jpeg';
import dolphin from 'assets/images/memorydemo/dolphin.png';
import shark from 'assets/images/memorydemo/shark.png';
import whale from 'assets/images/memorydemo/whale.png';
import swordfish from 'assets/images/memorydemo/swordfish.png';

const OPTIONS = {
  backgroundColor: 0x1099bb,
  style: {
    transform: 'scale 1.1',
  },
};

const mockData = [
  { name: 'seahorse', img: seahorse },
  { name: 'dolphin', img: dolphin },
  { name: 'shark', img: shark },
  { name: 'whale', img: whale },
  { name: 'swordfish', img: swordfish },
];

function Memory() {
  const [board, setBoard] = useState([]);
  const [currentTurns, setCurrentTurns] = useState([]);

  useEffect(() => {
    const auxBucket = mockData.reduce((acc, it) => ({ ...acc, [it.name]: 0}), {});
    const blankBoard = [];
    for (let i = 0; i < mockData.length * 2; i++) {
      blankBoard.push({});
    }

    const copyBoard = [...mockData];
    const newBoard = blankBoard.map((it, ind) => {
      let itemInd = Math.floor(Math.random() * copyBoard.length);
      let mockItem = { ...copyBoard[itemInd] };
      
      while(auxBucket[mockItem.name] >= 2){
        itemInd = Math.floor(Math.random() * copyBoard.length);
        mockItem = { ...copyBoard[itemInd] };
      }

      auxBucket[mockItem.name]++;

      return { ...mockItem, folded: false, id: `${mockItem.name}-${ind}` };
    });

    setBoard([...newBoard]);
  }, []);

  useEffect(() => {
    const copyBoard = [...board];
    if(currentTurns.length > 2){
      currentTurns.forEach(it => {
        copyBoard[it].folded = false;
      });
      setBoard([...copyBoard]);
      setCurrentTurns([]);
    }else if(currentTurns.length === 2){
      const it1 = { ...board[currentTurns[0]] };
      const it2 = { ...board[currentTurns[1]] };

      if(it1.name === it2.name){
        setCurrentTurns([]);
      }else{
        setTimeout(() => {
          currentTurns.forEach(it => {
            copyBoard[it].folded = false;
          });
          setBoard([...copyBoard]);
          setCurrentTurns([]);
        }, 750);
      }
    }
  }, [board, currentTurns]);

  const foldItem = (i) => {
    if(currentTurns.length < 2){
      const copyBoard = [...board];
      const { folded } = copyBoard[i];
      copyBoard[i].folded = !folded;
      setBoard([...copyBoard]);
      if(currentTurns.findIndex(it => (it === i)) > -1){
        setCurrentTurns([]);
      }else{
        setCurrentTurns([...currentTurns, i]);
      }
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
        const auxX = (ind % (board.length / 2));
        const x = (auxX * 100) + (30 * auxX);
        const auxY = Math.floor(ind / (board.length / 2));
        const y = (auxY * 100) + (30 * (auxY + 1));

        return (
          <Sprite
            key={it.id}
            x={x}
            y={y}
            width={100}
            height={100}
            texture={new PIXI.Texture.from(it.folded ? it.img : cover, { x: 100, y: 100 })}
            interactive
            click={() => { foldItem(ind) }}
          />
        )
      })}
    </Stage>
  );
}

export default Memory;
