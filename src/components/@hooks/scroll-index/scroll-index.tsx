
import { RefObject, useLayoutEffect } from 'react';

export type ScrollIndexRef = {
  element: Element | undefined;
  index: number;
}

export function useScrollIndex(callback: (scrollIndexRef: ScrollIndexRef) => void, containerRef: RefObject<HTMLDivElement>, selector: string, state: any): RefObject<HTMLDivElement> {

  const getScrollIndexRef = (): ScrollIndexRef => {
    const node = containerRef.current;
    const elements: Element[] = node ? Array.prototype.slice.call(node.querySelectorAll(selector)) : [];
    let index = -1;
    const element = elements.find(
      element => {
        const rect = element.getBoundingClientRect();
        return rect.y < window.innerHeight && rect.bottom > window.innerHeight / 2
      }
    );
    if (element) {
      index = elements.indexOf(element);
    }
    return { element, index };
  };

  const onScroll = () => {
    const scrollIndexRef = getScrollIndexRef();
    if (typeof callback === 'function') {
      callback(scrollIndexRef);
    }
  }

  useLayoutEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [state]);

  return containerRef;
}
