
import { RefObject, useLayoutEffect, useMemo } from 'react';

export function useScrollRepos(containerRef: RefObject<HTMLDivElement>, selector: string, state: any): RefObject<HTMLDivElement> {

  // Ref to the container with elements
  // const containerRef = useRef<HTMLDivElement>(null);

  // Helper function that allows finding first element in the view port
  const findFirstElementInViewPort = (elements: Element[]) => elements.find(
    element => {
      const rect = element.getBoundingClientRect();
      return rect.y < window.innerHeight && rect.bottom > window.innerHeight / 2 // nav height offset
    }
  );

  const scrollTo = useMemo(() => {
    // Find all elements in container which will be checked if are in view or not
    const node = containerRef.current;
    const elements = node ? Array.prototype.slice.call(node.querySelectorAll(selector)) : [];
    return findFirstElementInViewPort(elements);
  }, [state]);

  useLayoutEffect(() => {
    if (scrollTo) {
      console.log(scrollTo);
      // Scroll to element with should be in view after rendering
      scrollTo.scrollIntoView();
      // Scroll by height of nav
      window.scrollBy(0, - window.innerHeight / 100 * 5);
    }
  }, [scrollTo, state]);

  return containerRef;
}
