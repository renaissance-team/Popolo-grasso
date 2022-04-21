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
  IMouseInteractionState,
  IPlatformState,
  IPlayerState,
} from './types';

import FIRST_LEVEL from './levels/firstLevel';

import rectangleCollisionDetectionX from './utils/rectangleCollisionDetectionX';
import rectangleCollisionDetectionY from './utils/rectangleCollisionDetectionY';

const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 500;

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

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const requestAnimationFrameIdRef = useRef<number | null>(null);

  const DEFAULT_PLAYER_STATE: IPlayerState = {
    position: {
      x: CANVAS_WIDTH / PLAYER_INITIAL_POSITION_X_DEVIDER,
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
      y: CANVAS_HEIGHT - 25,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    width: CANVAS_WIDTH,
    height: 25,
  };

  const basePlatformStateRef = useRef<ICanvasRectangleObject>(DEFAULT_BASE_PLATFORM_STATE);

  const platformsStateRef = useRef<IPlatformState[]>(FIRST_LEVEL);

  const mouseInteractionStateRef = useRef<IMouseInteractionState>({
    click: {
      clientXOnCanvasElem: 0,
      clientYOnCanvasElem: 0,
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
    const leftStopEdgePositionX = CANVAS_WIDTH / 6;
    const rightStopEdgePositionX = CANVAS_WIDTH / 3;

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

    canvasContext.fillStyle = 'white';

    canvasContext.fillRect(
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

  const handlePauseButtonClick = () => {
    gameStateRef.current.started = false;
  };

  const pauseButtonRef = useRef<ICanvasButtonObject>({
    title: 'Пауза',
    onClick: handlePauseButtonClick,
    position: {
      x: 0,
      y: 0,
    },
    width: 0,
    height: 0,
  });

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

  const drawPlayerScore = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvasContext = canvasRef.current.getContext('2d');

    if (!canvasContext) {
      return;
    }

    const DEFAULT_SCORE_TEXT_MARGIN_TOP = 10;
    const DEFAULT_SCORE_TEXT_MARGIN_LEFT = 10;
    const DEFAULT_SCORE_FONT_SIZE = 16;

    canvasContext.fillStyle = 'red';
    canvasContext.font = `bold ${DEFAULT_SCORE_FONT_SIZE}px sans-serif`;

    const scoreText = `Счёт: ${playerStateRef.current.score}`;

    const scoreTextMeasurements = canvasContext.measureText(scoreText);

    const height = Math.abs(
      scoreTextMeasurements.actualBoundingBoxAscent,
    ) + Math.abs(
      scoreTextMeasurements.actualBoundingBoxDescent,
    );

    canvasContext.fillText(
      scoreText,
      DEFAULT_SCORE_TEXT_MARGIN_LEFT,
      height + DEFAULT_SCORE_TEXT_MARGIN_TOP,
    );
  };

  const drawPauseGameButton = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvasContext = canvasRef.current.getContext('2d');

    if (!canvasContext) {
      return;
    }

    const DEFAULT_PAUSE_GAME_BUTTON_TITLE_MARGIN_TOP = 10;
    const DEFAULT_PAUSE_GAME_BUTTON_TITLE_MARGIN_RIGHT = 10;
    const DEFAULT_PAUSE_GAME_BUTTON_TITLE_FONT_SIZE = 16;

    canvasContext.fillStyle = 'red';
    canvasContext.font = `bold ${DEFAULT_PAUSE_GAME_BUTTON_TITLE_FONT_SIZE}px sans-serif`;

    const pauseGameButtonTitleTextMeasuremnts = canvasContext.measureText(pauseButtonRef.current.title);

    const {width} = pauseGameButtonTitleTextMeasuremnts;
    const height = Math.abs(
      pauseGameButtonTitleTextMeasuremnts.actualBoundingBoxAscent,
    ) + Math.abs(
      pauseGameButtonTitleTextMeasuremnts.actualBoundingBoxDescent,
    );

    pauseButtonRef.current.width = width;
    pauseButtonRef.current.height = height;
    pauseButtonRef.current.position.x = CANVAS_WIDTH - width - DEFAULT_PAUSE_GAME_BUTTON_TITLE_MARGIN_RIGHT;
    pauseButtonRef.current.position.y = height + DEFAULT_PAUSE_GAME_BUTTON_TITLE_MARGIN_TOP;

    canvasContext.fillText(
      pauseButtonRef.current.title,
      pauseButtonRef.current.position.x,
      pauseButtonRef.current.position.y,
    );
  };

  const drawMenu = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvasContext = canvasRef.current.getContext('2d');

    if (!canvasContext) {
      return;
    }

    const DEFAULT_BUTTON_MARGIN = 10;
    const DEFAULT_BUTTON_FONT_SIZE = 24;

    canvasContext.fillStyle = 'red';
    canvasContext.font = `bold ${DEFAULT_BUTTON_FONT_SIZE}px sans-serif`;

    menuStateRef.current.buttons = menuStateRef.current.buttons.map((buttonState, index) => {
      const buttonTextMeasurements = canvasContext.measureText(buttonState.title);

      const {width} = buttonTextMeasurements;
      const height = Math.abs(
        buttonTextMeasurements.actualBoundingBoxAscent,
      ) + Math.abs(
        buttonTextMeasurements.actualBoundingBoxDescent,
      );

      const position: ICanvasButtonObject['position'] = {
        x: (CANVAS_WIDTH / 2) - (width / 2),
        y: index === 0
          ? (CANVAS_HEIGHT / 2)
          : (CANVAS_HEIGHT / 2) + (index * height) + DEFAULT_BUTTON_MARGIN,
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
      clientXOnCanvasElem: 0,
      clientYOnCanvasElem: 0,
    };
  };

  const userMouseInteractionWithCanvasButtonObjectHappened = (
    mouseInteractionState: IMouseInteractionState,
    canvasButtonObject: ICanvasButtonObject,
  ): boolean => (
    mouseInteractionState.click.clientXOnCanvasElem + 1 >= canvasButtonObject.position.x
        && (mouseInteractionState.click.clientXOnCanvasElem + 1
          <= canvasButtonObject.position.x + canvasButtonObject.width)
        && (mouseInteractionState.click.clientYOnCanvasElem + 1
          >= canvasButtonObject.position.y - canvasButtonObject.height)
        && mouseInteractionState.click.clientYOnCanvasElem + 1 <= canvasButtonObject.position.y
  );

  const userInteractionDetectionWithMenu = () => {
    menuStateRef.current.buttons.forEach((buttonState) => {
      if (userMouseInteractionWithCanvasButtonObjectHappened(
        mouseInteractionStateRef.current,
        buttonState,
      )) {
        buttonState.onClick();
      }
    });
  };

  const userInteractionDetectionWithPauseButton = () => {
    if (userMouseInteractionWithCanvasButtonObjectHappened(
      mouseInteractionStateRef.current,
      pauseButtonRef.current,
    )) {
      pauseButtonRef.current.onClick();
    }
  };

  const animate = useCallback(() => {
    requestAnimationFrameIdRef.current = requestAnimationFrame(animate);

    handleClearCanvas();

    if (gameStateRef.current.started) {
      drawBasePlatform();

      updatePlayer();

      handleChangePlayerVelocityX();
      handleChangePlayerVelocityY();

      playerCollisionDetectionWithPlatforms();

      drawPlatforms();
      drawPlayerScore();
      drawPauseGameButton();
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
    if (!canvasRef.current) {
      return;
    }

    const canvasRect = canvasRef.current.getBoundingClientRect();

    const {
      clientX,
      clientY,
    } = event;

    mouseInteractionStateRef.current.click = {
      clientXOnCanvasElem: clientX - canvasRect.x,
      clientYOnCanvasElem: clientY - canvasRect.y,
    };

    userInteractionDetectionWithMenu();
    userInteractionDetectionWithPauseButton();

    resetMouseInteractionState();
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

    const rootElem = window.document.querySelector<HTMLElement>('#root');

    if (rootElem) {
      rootElem.style.height = 'var(--app-height)';
      rootElem.style.display = 'flex';
      rootElem.style.backgroundColor = 'black';
    }

    return () => {
      window.document.body.style.overflowX = 'auto';
      window.document.body.style.overflowY = 'auto';
      window.document.body.style.height = 'unset';

      if (rootElem) {
        rootElem.style.height = 'unset';
        rootElem.style.display = 'unset';
        rootElem.style.backgroundColor = 'unset';
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      style={{margin: 'auto'}}
    />
  );
}
