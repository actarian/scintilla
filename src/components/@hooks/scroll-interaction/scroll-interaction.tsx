
import { Dispatch, SetStateAction, useLayoutEffect, useRef, useState } from 'react';

export function useScrollInteraction(props: any[]): [boolean, Dispatch<SetStateAction<boolean>>] {

  const documentElement = document.documentElement;

  const previousTop = useRef(documentElement.scrollTop);

  const [active, setActive] = useState(true);

  const onScroll = (event: Event) => {
    if ((window as any).scrollDisabled) {
      return;
    }
    // console.log('onScroll', event);
    const scrollTop = Math.max(0, documentElement.scrollTop);
    if (scrollTop !== previousTop.current) {
      setActive(scrollTop - previousTop.current < 0);
      previousTop.current = scrollTop;
    }
  };

  useLayoutEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, props);

  return [active, setActive];
}
