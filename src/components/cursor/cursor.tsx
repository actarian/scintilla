import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { className } from '../@hooks/class-name/class-name';
import './cursor.scss';

const isMobile = () => {
  return /Android|Mobi/i.test(navigator.userAgent);
};

export function Cursor() {

  if (typeof navigator !== 'undefined' && isMobile()) {
    return null;
  }

  // const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (event: MouseEvent) => {
    // setPosition({ x: event.clientX, y: event.clientY });
    if (containerRef.current) {
      containerRef.current.style.left = `${event.clientX}px`;
      containerRef.current.style.top = `${event.clientY}px`;
    }
  };

  const onMouseDown = () => {
    setClicked(true);
  };

  const onMouseUp = () => {
    setClicked(false);
  };

  const onMouseLeave = () => {
    setHidden(true);
  };

  const onMouseEnter = () => {
    setHidden(false);
  };

  const handleLinkHoverEvents = () => {
    document.querySelectorAll('a, [data-hover]').forEach((element) => {
      element.addEventListener('mouseover', () => setHovered(true));
      element.addEventListener('mouseout', () => setHovered(false));
    });
  };

  const addEventListeners = () => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
  };

  const removeEventListeners = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseenter', onMouseEnter);
    document.removeEventListener('mouseleave', onMouseLeave);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
  };

  useEffect(() => {
    addEventListeners();
    handleLinkHoverEvents();
    return () => removeEventListeners();
  }, []);

  // style={{ left: `${position.x}px`, top: `${position.y}px` }}

  return (
    <div ref={containerRef} className={className('cursor', { 'cursor--clicked': clicked, 'cursor--hidden': hidden, 'cursor--hovered': hovered })} />
  );
};
