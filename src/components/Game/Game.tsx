import React, {
  useRef,
  useCallback,
  useLayoutEffect,
  useEffect,
} from 'react';

import {
  ICanvasButtonObject,
  ICanvasRectangleObject,
  IGameMenu,
  IGameState,
  IKeyboardInteractionState,
  IPlatformState,
  IPlayerState,
} from './types';

import FIRST_LEVEL from './levels/firstLevel';

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
const SCORE_TERM = 1;

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

const initialGameState: IGameState = {
  started: false,
};

export default function Game(): React.ReactElement {
  const gameStateRef = useRef<IGameState>(initialGameState);

  const windowVisualViewportSize = useWindowVisualViewportSize();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const requestAnimationFrameIdRef = useRef<number | null>(null);

  const DEFAULT_PLAYER_STATE: IPlayerState = {
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
    score: 0,
    onTheBasePlatform: false,
  };

  const playerStateRef = useRef<IPlayerState>(DEFAULT_PLAYER_STATE);

  const DEFAULT_BASE_PLATFORM_STATE: ICanvasRectangleObject = {
    position: {
      x: 0,
      y: windowVisualViewportSize.height - 25,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    width: windowVisualViewportSize.width,
    height: 25,
  };

  const basePlatformStateRef = useRef<ICanvasRectangleObject>(DEFAULT_BASE_PLATFORM_STATE);

  const platformsStateRef = useRef<IPlatformState[]>(FIRST_LEVEL);

  const mouseInteractionStateRef = useRef<{
    click: {
      clientX: number,
      clientY: number,
    }
  }>({
    click: {
      clientX: 0,
      clientY: 0,
    },
  });

  const keyboardInteractionStateRef = useRef<IKeyboardInteractionState>(initialKeyboardState);

  const drawBasePlatform = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvasContext = canvasRef.current.getContext('2d');

    if (!canvasContext) {
      return;
    }

    canvasContext.fillStyle = 'green';
    canvasContext.fillRect(
      basePlatformStateRef.current.position.x,
      basePlatformStateRef.current.position.y,
      basePlatformStateRef.current.width,
      basePlatformStateRef.current.height,
    );
  };

  const drawPlatforms = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvasContext = canvasRef.current.getContext('2d');

    if (!canvasContext) {
      return;
    }

    platformsStateRef.current.forEach((platformState, index, array) => {
      canvasContext.fillStyle = index === array.length - 1 ? 'yellow' : 'blue';
      canvasContext.fillRect(
        platformState.position.x,
        platformState.position.y,
        platformState.width,
        platformState.height,
      );
    });
  };

  const increasePlayerScore = () => {
    if (!playerStateRef.current.onTheBasePlatform) {
      playerStateRef.current.score += SCORE_TERM;
    }
  };

  const handlePlayerOnTheBasePlatform = () => {
    if (!playerStateRef.current.onTheBasePlatform) {
      playerStateRef.current.onTheBasePlatform = true;
    }
  };

  const handlePlayerNotOnTheBasePlatform = () => {
    if (playerStateRef.current.onTheBasePlatform) {
      playerStateRef.current.onTheBasePlatform = false;
    }
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

  const handleChangePlayerPositionY = useCallback(() => {
    playerStateRef.current.position.y += playerStateRef.current.velocity.y;

    handlePlayerGravity();
  }, []);

  const handleChangePlayerPositionX = useCallback(() => {
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

    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(
      playerStateRef.current.position.x,
      playerStateRef.current.position.y,
      playerStateRef.current.width,
      playerStateRef.current.height,
    );
  };

  const updatePlayer = useCallback(
    () => {
      drawPlayer();

      handleChangePlayerPositionX();
      handleChangePlayerPositionY();
    },
    [handleChangePlayerPositionX, handleChangePlayerPositionY],
  );

  const drawPlayerScore = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvasContext = canvasRef.current.getContext('2d');

    if (!canvasContext) {
      return;
    }

    canvasContext.fillStyle = 'black';
    canvasContext.font = 'bold 24px sans-serif';
    canvasContext.fillText(`Score: ${playerStateRef.current.score}`, 50, 50);
  };

  const handleMovePlatforms = () => {
    if (keyboardInteractionStateRef.current.arrowRight.pressed) {
      platformsStateRef.current = platformsStateRef.current.map((platformState) => {
        if (platformState.playerOnThePlatform) {
          increasePlayerScore();
        }

        return (
          {
            ...platformState,
            position: {
              ...platformState.position,
              x: platformState.position.x - MOVE_TO_LEFT_VELOCITY,
            },
          }
        );
      });
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

  const handleChangePlayerVelocityX = useCallback(() => {
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

  const handleChangePlayerVelocityY = useCallback(() => {
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

  const handlePlayerOnThePlatform = (platformIndex: number) => {
    const currPlatform = platformsStateRef.current[platformIndex];

    if (currPlatform && !currPlatform.playerOnThePlatform) {
      currPlatform.playerOnThePlatform = true;
    }
  };

  const handlePlayerNotOnThePlatform = (platformIndex: number) => {
    const currPlatform = platformsStateRef.current[platformIndex];

    if (currPlatform && currPlatform.playerOnThePlatform) {
      currPlatform.playerOnThePlatform = false;
    }
  };

  const playerCollisionDetectionWithPlatforms = () => {
    platformsStateRef.current.forEach((platformState, index) => {
      const isPlayerCollisionWithPlatformOnXDetected = rectangleCollisionDetectionX(
        playerStateRef.current,
        platformState,
      );

      const isPlayerCollisionWithPlatformOnYDetected = rectangleCollisionDetectionY(
        playerStateRef.current,
        platformState,
      );

      if (isPlayerCollisionWithPlatformOnXDetected
        && isPlayerCollisionWithPlatformOnYDetected) {
        handlePlayerMoveToBottomStop();

        handlePlayerOnThePlatform(index);
      } else {
        handlePlayerNotOnThePlatform(index);
      }
    });

    const isPlayerCollisionWithBasePlatformOnXDetected = rectangleCollisionDetectionX(
      playerStateRef.current,
      basePlatformStateRef.current,
    );

    const isPlayerCollisionWithBasePlatformOnYDetected = rectangleCollisionDetectionY(
      playerStateRef.current,
      basePlatformStateRef.current,
    );

    if (isPlayerCollisionWithBasePlatformOnXDetected
      && isPlayerCollisionWithBasePlatformOnYDetected) {
      handlePlayerMoveToBottomStop();

      handlePlayerOnTheBasePlatform();
    } else {
      handlePlayerNotOnTheBasePlatform();
    }
  };

  const handleMenuStartButtonClick = () => {
    gameStateRef.current.started = true;
  };

  const menuStateRef = useRef<IGameMenu>({
    buttons: [
      {
        title: 'Старт',
        onClick: handleMenuStartButtonClick,
        position: {
          x: 0,
          y: 0,
        },
        width: 0,
        height: 0,
      },
    ],
  });

  const drawMenu = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvasContext = canvasRef.current.getContext('2d');

    if (!canvasContext) {
      return;
    }

    const DEFAULT_BUTTON_MARGIN = 10;

    canvasContext.fillStyle = 'red';
    canvasContext.font = 'bold 44px sans-serif';

    menuStateRef.current.buttons = menuStateRef.current.buttons.map((buttonState, index) => {
      const buttonTextMeasurements = canvasContext.measureText(buttonState.title);

      const {width} = buttonTextMeasurements;
      const height = Math.abs(
        buttonTextMeasurements.actualBoundingBoxAscent,
      ) + Math.abs(
        buttonTextMeasurements.actualBoundingBoxDescent,
      );

      const position: ICanvasButtonObject['position'] = {
        x: (windowVisualViewportSize.width / 2) - (width / 2),
        y: index === 0
          ? (windowVisualViewportSize.height / 2)
          : (windowVisualViewportSize.height / 2) + (index * height) + DEFAULT_BUTTON_MARGIN,
      };

      canvasContext.fillText(
        buttonState.title,
        position.x,
        position.y,
      );

      return {
        ...buttonState,
        position,
        width,
        height,
      };
    });
  };

  const resetMouseInteractionState = () => {
    mouseInteractionStateRef.current.click = {
      clientX: 0,
      clientY: 0,
    };
  };

  const userInteractionDetectionWithMenu = () => {
    menuStateRef.current.buttons.forEach((buttonState) => {
      if (
        mouseInteractionStateRef.current.click.clientX + 1 >= buttonState.position.x
        && mouseInteractionStateRef.current.click.clientX + 1 <= buttonState.position.x + buttonState.width
        && mouseInteractionStateRef.current.click.clientY + 1 >= buttonState.position.y - buttonState.height
        && mouseInteractionStateRef.current.click.clientY + 1 <= buttonState.position.y
      ) {
        buttonState.onClick();
      }
    });

    resetMouseInteractionState();
  };

  const animate = useCallback(() => {
    requestAnimationFrameIdRef.current = requestAnimationFrame(animate);

    handleClearCanvas();

    if (gameStateRef.current.started) {
      drawBasePlatform();

      drawPlatforms();

      updatePlayer();

      handleChangePlayerVelocityX();
      handleChangePlayerVelocityY();

      playerCollisionDetectionWithPlatforms();

      drawPlayerScore();
    } else {
      drawMenu();
    }
  }, [updatePlayer, handleChangePlayerVelocityX, handleChangePlayerVelocityY]);

  useLayoutEffect(() => {
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

  const handleMouseClick = (event: MouseEvent) => {
    const {
      clientX,
      clientY,
    } = event;

    mouseInteractionStateRef.current.click = {
      clientX,
      clientY,
    };

    userInteractionDetectionWithMenu();
  };

  useLayoutEffect(() => {
    window.addEventListener('click', handleMouseClick);

    return () => {
      window.removeEventListener('click', handleMouseClick);
    };
  }, []);

  useLayoutEffect(() => {
    window.addEventListener('keydown', handleKeyboardInteraction);

    return () => {
      window.removeEventListener('keydown', handleKeyboardInteraction);
    };
  }, []);

  useLayoutEffect(() => {
    window.addEventListener('keyup', handleKeyboardInteraction);

    return () => {
      window.removeEventListener('keyup', handleKeyboardInteraction);
    };
  }, []);

  useEffect(() => {
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
