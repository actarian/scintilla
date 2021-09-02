
import { RefObject, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';

export function useScrollHistory(containerRef: RefObject<HTMLDivElement>, selector: string, state: any): RefObject<HTMLDivElement> {

  const history = useHistory();

  const findFirstElementInViewPort = (elements: Element[]) => elements.find(
    element => {
      const rect = element.getBoundingClientRect();
      return rect.y < window.innerHeight && rect.bottom > window.innerHeight / 2 // nav height offset
    }
  );

  const getPageRef = () => {
    const node = containerRef.current;
    const nodeElements = node ? Array.prototype.slice.call(node.querySelectorAll(selector)) : [];
    return findFirstElementInViewPort(nodeElements);
  };

  const onScroll = () => {
    const pageRef = getPageRef();
    const pageRefUrl = pageRef ? pageRef.getAttribute('data-url') : null;
    // console.log('onScroll', pageRef, pageRefUrl);
    if (pageRefUrl) {
      history.replace(pageRefUrl);
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
