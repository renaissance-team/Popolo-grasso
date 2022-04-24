import React, {useState, useEffect} from 'react';

interface IUseIntersectionObserver {
  containerRef: React.MutableRefObject<Element | null>,
  options?: IntersectionObserverInit,
}

const DEFAULT_INTERSECTION_OBSERVER_INIT: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
};

interface IUseIntersectionObserverReturnType {
  isIntersecting: boolean,
}

export function useIntersectionObserver(
  {
    containerRef,
    options = DEFAULT_INTERSECTION_OBSERVER_INIT,
  }: IUseIntersectionObserver,
): IUseIntersectionObserverReturnType {
  const [intersecting, setIntersecting] = useState(true);

  function intersectionCallback(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      const {isIntersecting} = entry;
      setIntersecting(isIntersecting);
    });
  }

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(intersectionCallback, options);

    if (containerRef.current) {
      intersectionObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        intersectionObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef.current, options]);

  return {
    isIntersecting: intersecting,
  };
}
