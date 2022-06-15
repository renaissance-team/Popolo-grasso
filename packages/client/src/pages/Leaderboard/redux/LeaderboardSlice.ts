import {
  createAction, createAsyncThunk, createSlice, Dispatch
} from '@reduxjs/toolkit';
import {RootState, GetState} from '@/store';
import {DEFAULT_SERVER_ERROR} from '@/api/consts';
import {getLeaderboard, LeaderResponseType, LeaderboardRequestParamsType} from '../api/getLeaderboard';

export type LeaderboardStateType = {
  isLoading: boolean;
  data: LeaderResponseType[];
  error: string;
  requestParams: LeaderboardRequestParamsType;
  hasMore: boolean;
};

export const fetchLeaderboard = createAsyncThunk<
  LeaderResponseType[],
  LeaderboardRequestParamsType,
  {state: RootState}
>(
  'leaderboard/fetchLeaderboard',
  async (parameters) => getLeaderboard(parameters),
  {
    condition: (_, {getState}) => {
      const {
        leaderboard: {isLoading},
      } = getState();

      return !isLoading;
    },
  }
);

export const initialState: LeaderboardStateType = {
  isLoading: false,
  data: [] as LeaderResponseType[],
  error: '',
  requestParams: {ratingFieldName: 'popolo_grasso_points', limit: 4, cursor: 0} as LeaderboardRequestParamsType,
  hasMore: true,
};

const selectRequestParams = (state: RootState): LeaderboardRequestParamsType => state.leaderboard.requestParams;

export const setRequestParams = () => (dispatch: Dispatch, getState: GetState): void => {
  const state = getState();
  const params = selectRequestParams(state);

  dispatch(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetchLeaderboard({...params})
  );
};

export const resetCursor = createAction('leaderboard/resetCursor');

const LeaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLeaderboard.pending, (state, action) => {
      state.error = '';
      state.isLoading = true;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.requestParams = action.meta?.arg || null;
    });

    builder.addCase(fetchLeaderboard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.data = state.data.concat(action.payload);
      state.requestParams.cursor = action.payload?.length
        ? state.requestParams.cursor + state.requestParams.limit
        : state.requestParams.cursor;
      state.hasMore = !!action.payload?.length;
    });

    builder.addCase(fetchLeaderboard.rejected, (state) => {
      state.isLoading = false;
      state.data = state.data || [];
      state.error = DEFAULT_SERVER_ERROR;
    });

    builder.addCase(resetCursor, (state) => {
      state.requestParams.cursor = 0;
      state.data = [];
    });
  },
});

export const selectLeaderboardIsLoading = (state: RootState): boolean => !!state.leaderboard.isLoading;

export const selectLeaderboardData = (state: RootState): LeaderResponseType[] => state.leaderboard.data || [];

export const selectLeaderboardError = (state: RootState): string => state.leaderboard.error;

export const selectLeaderboardHasMore = (state: RootState): boolean => state.leaderboard.hasMore;

export default LeaderboardSlice.reducer;
