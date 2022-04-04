import React from 'react';

import {
  IKeyboardInteractionState,
  IPlayerState,
} from './types';

import useWindowVisualViewportSize from './hooks/useWindowVisualViewportSize/useWindowVisualViewportSize';

const initialPlayerState: IPlayerState = {
  position: {
    x: 50,
    y: 50,
  },
  velocity: {
    x: 0,
    y: 1,
  },
  width: 50,
  height: 50,
};

const initialKeyboardState: IKeyboardInteractionState = {
  arrowLeft: {
    pressed: false,
  },
  arrowUp: {
    pressed: false,
  },
  arrowRight: {
    pressed: false,
  },
  arrowDown: {
    pressed: false,
  },
};

export default function Game(): React.ReactElement {
  const windowVisualViewportSize = useWindowVisualViewportSize();

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const requestAnimationFrameIdRef = React.useRef<number | null>(null);

  const playerStateRef = React.useRef<IPlayerState>(initialPlayerState);

  const keyboardInteractionStateRef = React.useRef<IKeyboardInteractionState>(initialKeyboardState);

  const handlePlayerGoLeftStart = () => {
    const PLAYER_GO_LEFT_VELOCITY = 5;

    playerStateRef.current.velocity.x = -PLAYER_GO_LEFT_VELOCITY;
  };

  const handlePlayerGoUpStart = () => {
    const PLAYER_GO_UP_VELOCITY = 10;

    playerStateRef.current.velocity.y = -PLAYER_GO_UP_VELOCITY;
  };

  const handlePlayerGoRightStart = () => {
    const PLAYER_GO_RIGHT_VELOCITY = 5;

    playerStateRef.current.velocity.x = PLAYER_GO_RIGHT_VELOCITY;
  };

  const handlePlayerGoLeftAndRightStop = () => {
    playerStateRef.current.velocity.x = 0;
  };

  const handleGravity = () => {
    const GRAVITY = 1;

    if (!canvasRef.current) {
      return;
    }

    const bottomEdgeOfTheCanvasReached = playerStateRef.current.position.y
        + playerStateRef.current.height
        + playerStateRef.current.velocity.y
      <= canvasRef.current.height;

    if (bottomEdgeOfTheCanvasReached) {
      playerStateRef.current.velocity.y += GRAVITY;
    } else {
      playerStateRef.current.velocity.y = 0;
      playerStateRef.current.position.y = canvasRef.current.height - playerStateRef.current.height;
    }
  };

  const handleChangePlayerPositionY = React.useCallback(() => {
    playerStateRef.current.position.y += playerStateRef.current.velocity.y;

    handleGravity();
  }, []);

  const handleChangePlayerPositionX = React.useCallback(() => {
    playerStateRef.current.position.x += playerStateRef.current.velocity.x;
  }, []);

  const drawPlayer = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvasContext = canvasRef.current.getContext('2d');

    if (!canvasContext) {
      return;
    }

    canvasContext.fillStyle = 'green';
    canvasContext.fillRect(
      playerStateRef.current.position.x,
      playerStateRef.current.position.y,
      playerStateRef.current.width,
      playerStateRef.current.height,
    );
  };

  const updatePlayer = React.useCallback(
    () => {
      drawPlayer();

      handleChangePlayerPositionX();
      handleChangePlayerPositionY();
    },
    [handleChangePlayerPositionX, handleChangePlayerPositionY],
  );

  const handleChangeVelocityX = React.useCallback(() => {
    if (keyboardInteractionStateRef.current.arrowLeft.pressed) {
      handlePlayerGoLeftStart();
    } else if (keyboardInteractionStateRef.current.arrowRight.pressed) {
      handlePlayerGoRightStart();
    } else {
      handlePlayerGoLeftAndRightStop();
    }
  }, []);

  const handleChangeVelocityY = React.useCallback(() => {
    if (keyboardInteractionStateRef.current.arrowUp.pressed) {
      handlePlayerGoUpStart();
    }
  }, []);

  const handleClearCanvas = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvasContext = canvasRef.current.getContext('2d');

    if (!canvasContext) {
      return;
    }

    canvasContext.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
    );
  };

  const animatePlayer = React.useCallback(() => {
    requestAnimationFrameIdRef.current = requestAnimationFrame(animatePlayer);

    handleClearCanvas();

    updatePlayer();

    handleChangeVelocityX();
    handleChangeVelocityY();
  }, [updatePlayer, handleChangeVelocityX, handleChangeVelocityY]);

  React.useLayoutEffect(() => {
    requestAnimationFrameIdRef.current = requestAnimationFrame(animatePlayer);

    return () => {
      if (requestAnimationFrameIdRef.current) {
        cancelAnimationFrame(requestAnimationFrameIdRef.current);
      }
    };
  }, [animatePlayer]);

  const handleKeyboardInteraction = (event: KeyboardEvent) => {
    const {keyCode, type} = event;

    switch (keyCode) {
      case 37:
        keyboardInteractionStateRef.current.arrowLeft.pressed = type === 'keydown';
        break;

      case 38:
        keyboardInteractionStateRef.current.arrowUp.pressed = type === 'keydown';
        break;

      case 39:
        keyboardInteractionStateRef.current.arrowRight.pressed = type === 'keydown';
        break;

      case 40:
        keyboardInteractionStateRef.current.arrowDown.pressed = type === 'keydown';
        break;

      default:
    }
  };

  React.useLayoutEffect(() => {
    window.addEventListener('keydown', handleKeyboardInteraction);

    return () => {
      window.removeEventListener('keydown', handleKeyboardInteraction);
    };
  }, []);

  React.useLayoutEffect(() => {
    window.addEventListener('keyup', handleKeyboardInteraction);

    return () => {
      window.removeEventListener('keyup', handleKeyboardInteraction);
    };
  }, []);

  React.useEffect(() => {
    window.document.body.style.overflowX = 'hidden';
    window.document.body.style.overflowY = 'hidden';
    window.document.body.style.margin = '0';

    return () => {
      window.document.body.style.overflowX = 'auto';
      window.document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={windowVisualViewportSize.width}
      height={windowVisualViewportSize.height}
    />
  );
}
