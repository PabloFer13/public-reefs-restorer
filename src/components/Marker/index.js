import React from 'react';

const Marker = ({ id, btnRef, onMouseEnter, onMouseLeave }) => (
  <span
    className={`marker${id} cursor-pointer absolute bg-white rounded-full w-2 h-2`}
    onMouseEnter={() => onMouseEnter()}
    onMouseLeave={() => onMouseLeave()}
    ref={btnRef}
  />
);

export default Marker;
