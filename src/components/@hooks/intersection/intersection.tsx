import { RefObject, useEffect } from 'react';

let listenerCallbacks = new WeakMap();

let observer: IntersectionObserver;

function handleIntersections(entries: IntersectionObserverEntry[]) {
  entries.forEach(entry => {
    if (listenerCallbacks.has(entry.target)) {
      let cb = listenerCallbacks.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listenerCallbacks.delete(entry.target);
        cb();
      }
    }
  });
}

function getIntersectionObserver() {
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      rootMargin: '100px',
      threshold: 0.15,
    });
  }
  return observer;
}

export function useIntersection(elementRef: RefObject<Element>, callback: () => void, rootMargin: string) {

  useEffect(() => {
    let element = elementRef.current;
    if (element) {
      let observer = getIntersectionObserver();
      listenerCallbacks.set(element, callback);
      observer.observe(element);
      return () => {
        if (element) {
          listenerCallbacks.delete(element);
          observer.unobserve(element);
        }
      };
    } else {
      return () => { };
    }
  }, []);

};
