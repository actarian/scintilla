
import { Dispatch, SetStateAction, useLayoutEffect, useRef, useState } from 'react';

export function useMouseInteraction(props: any[]): [boolean, Dispatch<SetStateAction<boolean>>] {

  const ti = useRef(0);

  const [active, setActive] = useState(true);

  const onTimeout = () => {
    if (ti.current) {
      clearTimeout(ti.current);
    }
    const ti_: any = setTimeout(() => {
      setActive(false);
    }, 2000);
    ti.current = ti_;
  };

  const previous = { x: 0, y: 0 };

  const onMove = (event: MouseEvent) => {
    if (Math.sqrt(Math.abs(previous.x - event.clientX) * Math.abs(previous.y - event.clientY)) > 30) {
      previous.x = event.clientX;
      previous.y = event.clientY;
      setActive(true);
      onTimeout();
    }
  };

  onTimeout();

  useLayoutEffect(() => {
    window.addEventListener('mousemove', onMove);

    return () => {
      if (ti.current) {
        clearTimeout(ti.current);
      }
      window.removeEventListener('mousemove', onMove);
    }
  }, props);

  return [active, setActive];
}
