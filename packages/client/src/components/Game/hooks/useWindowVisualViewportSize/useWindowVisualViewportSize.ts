import React from 'react';

import {IVisualViewportSizeState} from './types/IVisualViewportSizeState';

export default function useWindowVisualViewportSize() {
  const [size, setSize] = React.useState<IVisualViewportSizeState>({
    width: window.visualViewport.width,
    height: window.visualViewport.height,
  });

  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    let timeoutId: NodeJS.Timeout | null = null;

    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setSize({
          width: window.visualViewport.width,
          height: window.visualViewport.height,
        });
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}
