import React from 'react';

import {
  ICanvasRectangleObject,
  IKeyboardInteractionState,
} from './types';

import rectangleCollisionDetectionX from './utils/rectangleCollisionDetectionX';
import rectangleCollisionDetectionY from './utils/rectangleCollisionDetectionY';

import useWindowVisualViewportSize from './hooks/useWindowVisualViewportSize/useWindowVisualViewportSize';

const GRAVITY = 1;
const PLAYER_INITIAL_VELOCITY_X = 0;
const PLAYER_INITIAL_VELOCITY_Y = GRAVITY;
const PLAYER_INITIAL_POSITION_X_DEVIDER = 6;
const PLAYEY_INITIAL_POSITION_Y = 0;
const PLAYER_WIDTH = 25;
const PLAYER_HEIGHT = 25;
const MOVE_TO_LEFT_VELOCITY = 10;
const MOVE_TO_UP_VELOCITY = 10;
const MOVE_TO_RIGHT_VELOCITY = 10;

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

  const playerStateRef = React.useRef<ICanvasRectangleObject>({
    position: {
      x: windowVisualViewportSize.width / PLAYER_INITIAL_POSITION_X_DEVIDER,
      y: PLAYEY_INITIAL_POSITION_Y,
    },
    velocity: {
      x: PLAYER_INITIAL_VELOCITY_X,
      y: PLAYER_INITIAL_VELOCITY_Y,
    },
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
  });

  const platformsStateRef = React.useRef<ICanvasRectangleObject[]>([
    {
      position: {
        x: 600,
        y: 600,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      width: 150,
      height: 25,
    },

    {
      position: {
        x: 900,
        y: 400,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      width: 100,
      height: 25,
    },
  ]);

  const keyboardInteractionStateRef = React.useRef<IKeyboardInteractionState>(initialKeyboardState);

  const drawPlatforms = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvasContext = canvasRef.current.getContext('2d');

    if (!canvasContext) {
      return;
    }

    platformsStateRef.current.forEach((platformState) => {
      canvasContext.fillStyle = 'red';
      canvasContext.fillRect(
        platformState.position.x,
        platformState.position.y,
        platformState.width,
        platformState.height,
      );
    });
  };

  const handlePlayerMoveToLeftStart = () => {
    playerStateRef.current.velocity.x = -MOVE_TO_LEFT_VELOCITY;
  };

  const handlePlayerMoveToUpStart = () => {
    playerStateRef.current.velocity.y = -MOVE_TO_UP_VELOCITY;
  };

  const handlePlayerMoveToRightStart = () => {
    playerStateRef.current.velocity.x = MOVE_TO_RIGHT_VELOCITY;
  };

  const handlePlayerMoveToLeftAndRightStop = () => {
    playerStateRef.current.velocity.x = 0;
  };

  const handlePlayerMoveToBottomStop = () => {
    playerStateRef.current.velocity.y = 0;
  };

  const handlePlayerGravity = () => {
    if (!canvasRef.current) {
      return;
    }

    const bottomEdgeOfTheCanvasReached = playerStateRef.current.position.y
        + playerStateRef.current.height
        + playerStateRef.current.velocity.y
      >= canvasRef.current.height;

    if (!bottomEdgeOfTheCanvasReached) {
      playerStateRef.current.velocity.y += GRAVITY;
    } else {
      handlePlayerMoveToBottomStop();
    }
  };

  const handleChangePlayerPositionY = React.useCallback(() => {
    playerStateRef.current.position.y += playerStateRef.current.velocity.y;

    handlePlayerGravity();
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

  const handleMovePlatforms = () => {
    if (keyboardInteractionStateRef.current.arrowRight.pressed) {
      platformsStateRef.current = platformsStateRef.current.map((platformState) => (
        {
          ...platformState,
          position: {
            ...platformState.position,
            x: platformState.position.x - MOVE_TO_LEFT_VELOCITY,
          },
        }
      ));
    } else if (keyboardInteractionStateRef.current.arrowLeft.pressed) {
      platformsStateRef.current = platformsStateRef.current.map((platformState) => (
        {
          ...platformState,
          position: {
            ...platformState.position,
            x: platformState.position.x + MOVE_TO_RIGHT_VELOCITY,
          },
        }
      ));
    }
  };

  const handleChangePlayerVelocityX = React.useCallback(() => {
    const leftStopEdgePositionX = windowVisualViewportSize.width / 6;
    const rightStopEdgePositionX = windowVisualViewportSize.width / 3;

    const isPlayerHitLeftStopEdge = playerStateRef.current.position.x > leftStopEdgePositionX;
    const isPlayerHitRightStopEdge = playerStateRef.current.position.x <= rightStopEdgePositionX;

    if (keyboardInteractionStateRef.current.arrowLeft.pressed && isPlayerHitLeftStopEdge) {
      handlePlayerMoveToLeftStart();
    } else if (keyboardInteractionStateRef.current.arrowRight.pressed && isPlayerHitRightStopEdge) {
      handlePlayerMoveToRightStart();
    } else {
      handlePlayerMoveToLeftAndRightStop();

      handleMovePlatforms();
    }
  }, []);

  const handleChangePlayerVelocityY = React.useCallback(() => {
    if (keyboardInteractionStateRef.current.arrowUp.pressed) {
      handlePlayerMoveToUpStart();
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

  const playerCollisionDetectionWithPlatforms = () => {
    platformsStateRef.current.forEach((platformsState) => {
      const isPlayerCollisionWithPlatformOnXDetected = rectangleCollisionDetectionX(
        playerStateRef.current,
        platformsState,
      );

      const isPlayerCollisionWithPlatformOnYDetected = rectangleCollisionDetectionY(
        playerStateRef.current,
        platformsState,
      );

      if (isPlayerCollisionWithPlatformOnXDetected && isPlayerCollisionWithPlatformOnYDetected) {
        handlePlayerMoveToBottomStop();
      }
    });
  };

  const animate = React.useCallback(() => {
    requestAnimationFrameIdRef.current = requestAnimationFrame(animate);

    handleClearCanvas();

    updatePlayer();

    drawPlatforms();

    handleChangePlayerVelocityX();
    handleChangePlayerVelocityY();

    playerCollisionDetectionWithPlatforms();
  }, [updatePlayer, handleChangePlayerVelocityX, handleChangePlayerVelocityY]);

  React.useLayoutEffect(() => {
    requestAnimationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestAnimationFrameIdRef.current) {
        cancelAnimationFrame(requestAnimationFrameIdRef.current);
      }
    };
  }, [animate]);

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
