import { useState, createRef } from 'react';
import { createPopper } from '@popperjs/core';
import { Link } from 'react-router-dom';

const Popover = ({ id, color, title, desc, path }) => {
  const [popoverShow, setPopoverShow] = useState(false);
  const btnRef = createRef();
  const popoverRef = createRef();
  const openPopover = () => {
    createPopper(btnRef.current, popoverRef.current, {
      placement: 'top',
    });
    setPopoverShow(true);
  };
  const closePopover = () => {
    setPopoverShow(false);
  };
  return (
    <>
      <div className="flex flex-wrap">
        <Link to={path} className="w-full text-center">
          <span
            className={`marker${id} cursor-pointer`}
            onMouseEnter={() => openPopover()}
            onMouseLeave={() => closePopover()}
            ref={btnRef}
          />
          <div
            className={
              (popoverShow ? '' : 'hidden ') +
              'bg-' +
              color +
              ' border-0 mb-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg'
            }
            ref={popoverRef}>
            <div>
              <div
                className={
                  'bg-' +
                  color +
                  ' text-gray-900 opacity-75 font-semibold p-3 mb-0 border-b border-solid border-gray-500 uppercase rounded-t-lg'
                }>
                {title}
              </div>
              <div className="text-gray-600 p-3">
                <p className="font-bold pb-1">{desc}</p>
                <p>Último score: 0</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Popover;
