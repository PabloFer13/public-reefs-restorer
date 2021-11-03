import { useCallback, useEffect, useState } from 'react';

export function useTimer(time, callbacks = []) {
  const [timeLeft, setTimeLeft] = useState(time);
  const runCallbacks = useCallback(() => {
    callbacks.forEach(it => it());
  }, [callbacks]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => {
        // if(prevTime === 31){
        //   setNightMode(true);
        // }

        return prevTime > 0 ? prevTime - 1 : prevTime;
      });

      // setObjs(prevObjs => {
      //   prevObjs.reduce((acc, it) => {
      //     if(!it.found && it.over && it.over.found && it.over.timeFound !== -1 && (it.over.timeFound - prevTime) >= 5){
      //       const newCoords = getRandomCoords(true);
      //       const newBlock = getRandomBlock(true);
      //       return [...acc, { ...it, x: newCoords.x, y: newCoords.y, over: { ...newBlock } }];
      //     }

      //     return [...acc, { ...it }];
      //   }, []);
      // });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    runCallbacks();
  }, [timeLeft, runCallbacks]);

  return timeLeft;
}
