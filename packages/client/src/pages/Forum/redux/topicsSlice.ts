import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '@/store';
import {DEFAULT_SERVER_ERROR} from '@/api/consts';
import {ForumTopicResponseType, getTopicList} from '../components/api/getTopicList';

export type TopicListStateType = {
  isLoading: boolean;
  data: ForumTopicResponseType[];
  error: string;
};

export const fetchTopicList = createAsyncThunk<ForumTopicResponseType[], unknown, {state: RootState}>(
  'forum/topicList/fetchTopicList',
  async () => getTopicList(),
  {
    condition: (_, {getState}) => {
      const {
        forum: {topicList},
      } = getState();

      return !topicList?.isLoading;
    },
  }
);

export const initialState: TopicListStateType = {
  isLoading: false,
  data: [] as ForumTopicResponseType[],
  error: '',
};

const TopicListSlice = createSlice({
  name: 'forum.topicList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopicList.pending, (state) => {
      state.error = '';
      state.isLoading = true;
    });

    builder.addCase(fetchTopicList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.data = action.payload;
    });

    builder.addCase(fetchTopicList.rejected, (state) => {
      state.isLoading = false;
      state.data = state.data || [];
      state.error = DEFAULT_SERVER_ERROR;
    });
  },
});

export const selectTopicListIsLoading = (state: RootState): boolean => !!state.forum.topicList.isLoading;

export const selectTopicListData = (state: RootState): ForumTopicResponseType[] => state.forum.topicList.data || [];

export const selectTopicListError = (state: RootState): string => state.forum.topicList.error;

export default TopicListSlice.reducer;
