import React from 'react';

const Marker = ({ id, btnRef, onMouseEnter, onMouseLeave }) => (
  <span
    class={`flex h-4 w-4 marker${id} cursor-pointer absolute hover:animate-bounce`}
    onMouseEnter={() => onMouseEnter()}
    onMouseLeave={() => onMouseLeave()}
    ref={btnRef}>
    <span class="animate-ping relative inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
    <span class="absolute inline-flex rounded-full h-4 w-4 bg-red-500"></span>
  </span>
);

export default Marker;
