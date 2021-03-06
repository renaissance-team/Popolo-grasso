import React, {
  useRef,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {ROUTES} from '@/pages/consts';
import isServer from '@/utils/isServerChecker';

import {ENDPOINTS} from '@/api/consts';
import {resetCursor as resetLeaderboardCursor} from '@/pages/Leaderboard/redux/LeaderboardSlice';
import world from '@/assets/images/motypest3-min.jpg';
import {useTheme} from '@/utils';
import getGeolocation from '@/utils/getGeolocation';
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

import characterWalkRight from './sprites/character/characterWalkRight.png';
import characterWalkLeft from './sprites/character/characterWalkLeft.png';
import characterStandRight from './sprites/character/characterStandRight.png';
import characterStandLeft from './sprites/character/characterStandLeft.png';
import blueCrystall from './sprites/crystall-blue.png';
import pinkCrystall from './sprites/crystall-pink.png';
import dingEffect from './audio/ding.mp3';

import rectangleCollisionDetectionX from './utils/rectangleCollisionDetectionX';
import rectangleCollisionDetectionY from './utils/rectangleCollisionDetectionY';
import {useIntersectionObserver} from './hooks/useIntersectionObserver/useIntersectionObserver';
import {createLeaderboardResult, LeaderType} from './api/createLeaderboardResult';
import {selectUserData} from '../../store/user/reducer';
import styles from './index.module.scss';
import {ICrystallObject} from './types/IPlatformState';
import {getLocationName} from './api/getLocationName';

const CANVAS_IS_NOT_INTERSECTING_MESSAGE = 'Для старта игры необходим экран 500Х500 px';

const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 500;

const GRAVITY = 1;
const PLAYER_INITIAL_VELOCITY_X = 0;
const PLAYER_INITIAL_VELOCITY_Y = GRAVITY;
const PLAYER_INITIAL_POSITION_X_DEVIDER = 6;
const PLAYEY_INITIAL_POSITION_Y = 0;
const PLAYER_WIDTH = 100;
const PLAYER_HEIGHT = 145;
const MOVE_TO_LEFT_VELOCITY = 10;
const MOVE_TO_UP_VELOCITY = 15;
const MOVE_TO_RIGHT_VELOCITY = 10;
const SCORE_TERM = 1;
const TEXT_COLOR = '#FFF';

const PLATFORM_COLOR = 'blue';
const PLATFORM_HEIGHT = 25;
const BASE_PLATFORM_HEIGHT = PLATFORM_HEIGHT;

const PLAYER_JUMP_HEIGHT = (MOVE_TO_UP_VELOCITY ** 2) / (GRAVITY * 2); // APPROXIMATE (?)
const FIRST_LEVEL_PLATFORM_HEIGHT = CANVAS_HEIGHT - BASE_PLATFORM_HEIGHT - PLAYER_JUMP_HEIGHT;
const SECOND_LEVEL_PLATFORM_HEIGHT = FIRST_LEVEL_PLATFORM_HEIGHT - PLAYER_JUMP_HEIGHT;

const MEDIUM_PLATFORM_WIDTH = 250;
const LARGE_PLATFORM_WIDTH = 500;

const MEDIUM_DISTANCE_BETWEEN_PLATFORMS = 150;
const LARGE_DISTANCE_BETWEEN_PLATFORMS = 200;

const DEFAULT_BASE_PLATFORM_STATE: ICanvasRectangleObject = {
  position: {
    x: 0,
    y: CANVAS_HEIGHT - BASE_PLATFORM_HEIGHT,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  width: CANVAS_WIDTH,
  height: BASE_PLATFORM_HEIGHT,
};

const FIRST_PLATFORM: IPlatformState = {
  position: {
    x: 0,
    y: FIRST_LEVEL_PLATFORM_HEIGHT,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  width: CANVAS_WIDTH,
  height: PLATFORM_HEIGHT,
  playerOnThePlatform: false,
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

const createImg = (src: string): HTMLImageElement => {
  if (isServer) {
    return null as unknown as HTMLImageElement;
  }

  const img = new Image();
  img.src = src;

  return img;
};

const CHARACTER_WALK_RIGHT_IMAGE = createImg(characterWalkRight);

const CHARACTER_WALK_LEFT_IMAGE = createImg(characterWalkLeft);

const CHARACTER_STAND_RIGHT_IMAGE = createImg(characterStandRight);

const CHARACTER_STAND_LEFT_IMAGE = createImg(characterStandLeft);

const WORLD = createImg(world);

const CRYSTALS: Record<string, ICrystallObject> = {
  blue: {
    image: createImg(blueCrystall),
    width: 50,
    height: 50,
    score: 25,
  },
  pink: {
    image: createImg(pinkCrystall),
    width: 50,
    height: 60,
    score: 50,
  }
};

const initialGameState: IGameState = {
  started: false,
  offsetX: 0,
};

export default function Game(): React.ReactElement {
  const navigate = useNavigate();
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const gameStateRef = useRef<IGameState>(initialGameState);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const {isIntersecting} = useIntersectionObserver({containerRef: canvasRef});

  const requestAnimationFrameIdRef = useRef<number | null>(null);

  const audioDingRef = useRef<HTMLAudioElement | null>(null);

  const triggerFullscreen = () => {
    document.body.requestFullscreen();
  };

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
    onThePlatform: false,
    sprites: {
      currentSprite: CHARACTER_STAND_RIGHT_IMAGE,
      walkRightSprite: CHARACTER_WALK_RIGHT_IMAGE,
      walkLeftSprite: CHARACTER_WALK_LEFT_IMAGE,
      standRightSprite: CHARACTER_STAND_RIGHT_IMAGE,
      standLeftSprite: CHARACTER_STAND_LEFT_IMAGE,
    },
    frame: 0,
    isMoveRight: false,
    isMoveLeft: false,
  };

  const WORLD_STATE = {
    background: WORLD,
    offset: 0,
  };

  const playerStateRef = useRef<IPlayerState>(DEFAULT_PLAYER_STATE);

  const navigateToHomePage = async () => {
    if (playerStateRef.current.score > 0) {
      setLoading(true);
      const avatar = user.avatar ? `${ENDPOINTS.ROOT}/resources${user.avatar}` : '';

      let coords;
      try {
        coords = await getGeolocation();
      // eslint-disable-next-line no-empty
      } catch {}
      let coordsName;
      if (coords) {
        const params = {lat: coords.latitude, lon: coords.longitude, format: 'json'};
        try {
          coordsName = await getLocationName(params);
          // eslint-disable-next-line no-empty
        } catch {}
      }

      const leader: LeaderType = {
        popolo_grasso_display_name: user.display_name,
        popolo_grasso_user_id: user.id,
        popolo_grasso_avatar: avatar,
        popolo_grasso_points: playerStateRef.current.score,
        popolo_grasso_geo: coordsName || null,
        popolo_grasso_date: new Date()
      };
      try {
        await createLeaderboardResult(leader);
        dispatch(resetLeaderboardCursor());
        // eslint-disable-next-line no-empty
      } catch {}
      setLoading(false);
    }
    navigate(ROUTES.HOME);
  };

  const worldRef = useRef(WORLD_STATE);

  const basePlatformStateRef = useRef<ICanvasRectangleObject>(DEFAULT_BASE_PLATFORM_STATE);

  const platformsStateRef = useRef<IPlatformState[]>([FIRST_PLATFORM]);

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

    platformsStateRef.current.forEach((platformState) => {
      canvasContext.fillStyle = PLATFORM_COLOR;
      canvasContext.fillRect(
        platformState.position.x,
        platformState.position.y,
        platformState.width,
        platformState.height,
      );
      if (platformState.crystall) {
        canvasContext.drawImage(
          platformState.crystall.image,
          platformState.position.x + platformState.crystall.offset.x,
          platformState.position.y + platformState.crystall.offset.y,
          platformState.crystall.width,
          platformState.crystall.height,
        );
      }
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

  const handleClearCanvas = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvasContext = canvasRef.current.getContext('2d');

    if (canvasContext) {
      const pattern = canvasContext.createPattern(WORLD, 'repeat');
      canvasContext.fillStyle = pattern as CanvasPattern;
      if (!canvasRef.current) {
        return;
      }
      canvasContext.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasContext.strokeRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

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

    canvasContext.drawImage(
      playerStateRef.current.sprites.currentSprite,
      100 * playerStateRef.current.frame,
      0,
      100,
      145,
      playerStateRef.current.position.x,
      playerStateRef.current.position.y,
      playerStateRef.current.width,
      playerStateRef.current.height,
    );
  };

  const drawWord = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvasContext = canvasRef.current.getContext('2d');

    if (!canvasContext) {
      return;
    }

    let offset;
    if (worldRef.current.offset > 0) {
      offset = 0;
    } else if (worldRef.current.offset < -(worldRef.current.background.width - CANVAS_WIDTH)) {
      offset = -(worldRef.current.background.width - 500);
    } else {
      offset = worldRef.current.offset;
    }

    canvasContext.drawImage(
      worldRef.current.background,
      offset,
      -200
    );
  };

  const updatePlayerFrame = () => {
    playerStateRef.current.frame += 1;

    if (playerStateRef.current.frame > 59) {
      playerStateRef.current.frame = 0;
    }
  };

  const updatePlayer = useCallback(
    () => {
      drawWord();

      updatePlayerFrame();

      drawPlayer();

      handleChangePlayerPositionX();
      handleChangePlayerPositionY();
    },
    [handleChangePlayerPositionX, handleChangePlayerPositionY],
  );

  const increaseGameOffsetX = () => {
    if (keyboardInteractionStateRef.current.arrowRight.pressed) {
      gameStateRef.current.offsetX += MOVE_TO_LEFT_VELOCITY;
    }
  };

  const getRandomBoolean = (): boolean => Math.random() < 0.5;

  const handleAddPlatformInPlatformsState = () => {
    const randomBooleanForPlatformLevel = getRandomBoolean();
    const randomBooleanForCrystal = getRandomBoolean();
    const randomBooleanForCrystalType = getRandomBoolean();
    const randomBooleanForPlatformWidth = getRandomBoolean();
    const randomBooleanForDistanceBetweenPlatforms = getRandomBoolean();

    const lastPlatformInState = platformsStateRef.current[platformsStateRef.current.length - 1];
    const width = randomBooleanForPlatformWidth ? MEDIUM_PLATFORM_WIDTH : LARGE_PLATFORM_WIDTH;
    const randomCrystall = randomBooleanForCrystalType ? CRYSTALS.blue : CRYSTALS.pink;

    platformsStateRef.current.push({
      position: {
        x: randomBooleanForDistanceBetweenPlatforms
          ? lastPlatformInState.position.x + lastPlatformInState.width + MEDIUM_DISTANCE_BETWEEN_PLATFORMS
          : lastPlatformInState.position.x + lastPlatformInState.width + LARGE_DISTANCE_BETWEEN_PLATFORMS,
        y: randomBooleanForPlatformLevel
          ? FIRST_LEVEL_PLATFORM_HEIGHT
          : SECOND_LEVEL_PLATFORM_HEIGHT,
      },
      width,
      height: PLATFORM_HEIGHT,
      playerOnThePlatform: false,
      velocity: {
        x: 0,
        y: 0,
      },
      ...(randomBooleanForCrystal && {
        crystall: {
          ...randomCrystall,
          offset: {
            x: Math.random() * width,
            y: -randomCrystall.height * 1.5
          },
        }
      })
    });
  };

  const handleChangeGameOffsetX = () => {
    if (!(gameStateRef.current.offsetX % (CANVAS_WIDTH / 2)) && gameStateRef.current.offsetX > 0) {
      handleAddPlatformInPlatformsState();
    }
  };

  const handleMovePlatforms = () => {
    if (keyboardInteractionStateRef.current.arrowRight.pressed) {
      platformsStateRef.current = platformsStateRef.current.map((platformState) => {
        if (platformState.playerOnThePlatform) {
          increasePlayerScore();
        }

        return {
          ...platformState,
          position: {
            ...platformState.position,
            x: platformState.position.x - MOVE_TO_LEFT_VELOCITY,
          },
        };
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

    const isPlayerHitLeftStopEdge = playerStateRef.current.position.x < leftStopEdgePositionX;
    const isPlayerHitRightStopEdge = playerStateRef.current.position.x > rightStopEdgePositionX;

    if (keyboardInteractionStateRef.current.arrowLeft.pressed && !isPlayerHitLeftStopEdge) {
      handlePlayerMoveToLeftStart();
    } else if (keyboardInteractionStateRef.current.arrowRight.pressed && !isPlayerHitRightStopEdge) {
      handlePlayerMoveToRightStart();
    } else {
      handlePlayerMoveToLeftAndRightStop();

      handleMovePlatforms();
    }
  }, []);

  const handleChangePlayerVelocityY = useCallback(() => {
    const isPlayerCanMoveToUp = keyboardInteractionStateRef.current.arrowUp.pressed
    && (
      playerStateRef.current.onThePlatform || playerStateRef.current.onTheBasePlatform
    );

    if (isPlayerCanMoveToUp) {
      handlePlayerMoveToUpStart();
    }
  }, []);

  const handlePlayerOnThePlatform = (platformIndex: number) => {
    const currPlatform = platformsStateRef.current[platformIndex];

    if (currPlatform && !currPlatform.playerOnThePlatform) {
      currPlatform.playerOnThePlatform = true;
      playerStateRef.current.onThePlatform = true;
    }
  };

  const handlePlayerNotOnThePlatform = (platformIndex: number) => {
    const currPlatform = platformsStateRef.current[platformIndex];

    if (currPlatform && currPlatform.playerOnThePlatform) {
      currPlatform.playerOnThePlatform = false;
      playerStateRef.current.onThePlatform = false;
    }
  };

  const handlePlayerGetCrystall = (index: number) => {
    playerStateRef.current.score += platformsStateRef.current[index].crystall?.score || 0;
    platformsStateRef.current[index].crystall = undefined;

    if (audioDingRef.current) {
      audioDingRef.current.currentTime = 0;
      audioDingRef.current?.play();
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

  const playerCollisionDetectionWithCrystalls = () => {
    platformsStateRef.current.forEach((platformState, index) => {
      if (platformState.crystall) {
        const isPlayerCollisionWithCrystallOnXDetected = playerStateRef.current.position.x
         + playerStateRef.current.width / 2 >= platformState.position.x + platformState.crystall.offset.x
         && playerStateRef.current.position.x
         <= platformState.position.x + platformState.crystall.offset.x + platformState.crystall.width;
        const isPlayerCollisionWithCrystallOnYDetected = playerStateRef.current.position.y
        <= platformState.position.y + platformState.crystall.offset.y;

        if (isPlayerCollisionWithCrystallOnXDetected && isPlayerCollisionWithCrystallOnYDetected) {
          handlePlayerGetCrystall(index);
        }
      }
    });
  };

  const handleMenuStartButtonClick = () => {
    gameStateRef.current.started = true;
  };

  const handlePauseButtonClick = () => {
    gameStateRef.current.started = false;
    document.exitPointerLock();
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
      {
        title: 'Завершить и вернуться на главную',
        onClick: navigateToHomePage,
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

    canvasContext.fillStyle = TEXT_COLOR;
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

    canvasContext.fillStyle = TEXT_COLOR;
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

    const DEFAULT_BUTTON_MARGIN = 20;
    const DEFAULT_BUTTON_FONT_SIZE = 24;

    canvasContext.fillStyle = TEXT_COLOR;
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
          ? (CANVAS_HEIGHT / 2) + (height / 2)
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

  const drawMessage = (message: string) => {
    if (!canvasRef.current) {
      return;
    }

    const canvasContext = canvasRef.current.getContext('2d');

    if (!canvasContext) {
      return;
    }

    const DEFAULT_MESSAGE_FONT_SIZE = 14;

    canvasContext.fillStyle = TEXT_COLOR;
    canvasContext.font = `bold ${DEFAULT_MESSAGE_FONT_SIZE}px sans-serif`;

    const messageTextMeasurements = canvasContext.measureText(message);

    const {width} = messageTextMeasurements;
    const height = Math.abs(
      messageTextMeasurements.actualBoundingBoxAscent,
    ) + Math.abs(
      messageTextMeasurements.actualBoundingBoxDescent,
    );

    canvasContext.fillText(
      message,
      (CANVAS_WIDTH / 2) - (width / 2),
      (CANVAS_HEIGHT / 2) + (height / 2),
    );
  };

  const animate = useCallback(() => {
    requestAnimationFrameIdRef.current = requestAnimationFrame(animate);

    handleClearCanvas();

    if (isIntersecting) {
      if (gameStateRef.current.started) {
        updatePlayer();

        drawBasePlatform();

        drawPlatforms();

        handleChangePlayerVelocityX();
        handleChangePlayerVelocityY();

        increaseGameOffsetX();

        handleChangeGameOffsetX();

        playerCollisionDetectionWithPlatforms();
        playerCollisionDetectionWithCrystalls();
        drawPlayerScore();
        drawPauseGameButton();
      } else {
        drawMenu();
      }
    } else {
      drawMessage(CANVAS_IS_NOT_INTERSECTING_MESSAGE);
    }
  }, [updatePlayer, handleChangePlayerVelocityX, handleChangePlayerVelocityY, isIntersecting]);

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

    const pressed = type === 'keydown';
    document.body.requestPointerLock();

    switch (keyCode) {
      case 37:
        keyboardInteractionStateRef.current.arrowLeft.pressed = pressed;
        playerStateRef.current.sprites.currentSprite = pressed
          ? playerStateRef.current.sprites.walkLeftSprite
          : playerStateRef.current.sprites.standLeftSprite;
        playerStateRef.current.isMoveLeft = true;
        playerStateRef.current.isMoveRight = false;
        worldRef.current.offset += 20;
        break;
      case 38:
        if (playerStateRef.current.isMoveRight) {
          worldRef.current.offset -= 30;
        }
        if (playerStateRef.current.isMoveLeft) {
          worldRef.current.offset += 30;
        }
        keyboardInteractionStateRef.current.arrowUp.pressed = pressed;
        break;

      case 39:
        keyboardInteractionStateRef.current.arrowRight.pressed = pressed;
        playerStateRef.current.sprites.currentSprite = pressed
          ? playerStateRef.current.sprites.walkRightSprite
          : playerStateRef.current.sprites.standRightSprite;
        playerStateRef.current.isMoveLeft = false;
        playerStateRef.current.isMoveRight = true;
        worldRef.current.offset -= 20;
        break;

      case 40:
        keyboardInteractionStateRef.current.arrowDown.pressed = pressed;
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
    document.exitPointerLock();
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

  useLayoutEffect(() => {
    audioDingRef.current = new Audio(dingEffect);
    audioDingRef.current.load();
  }, []);

  return (
    <div className={useTheme(styles, 'container')}>
      <div className={styles.background} />
      <button
        aria-label="toggle fullscreen"
        type="button"
        className={styles.triggerFullscreen}
        onClick={triggerFullscreen}
      />
      <div className={styles.frame}>
        {loading ? (
          <div style={{width: CANVAS_WIDTH, height: CANVAS_HEIGHT}} className={styles.loader}>
            <div className={styles['fs-24']}>Сохраненяем результат.</div>
            <div>Пожалуйста, подождите...</div>
          </div>
        ) : (
          <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
        )}
      </div>
    </div>
  );
}
