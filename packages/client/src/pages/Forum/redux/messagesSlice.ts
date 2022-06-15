import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '@/store';
import {DEFAULT_SERVER_ERROR} from '@/api/consts';
import {getMessages, MessagesResponseType, MessagesRequestParamsType} from '../api/getMessages';

export type SelectedTopicType = {
  topicId?: number,
  topicName: string
}

export type MessagesStateType = {
  isLoading: boolean;
  data: MessagesResponseType[];
  error: string;
  selectedTopic: SelectedTopicType;
};

export const fetchMessages = createAsyncThunk<
  MessagesResponseType[],
  MessagesRequestParamsType,
  {state: RootState}
>(
  'forum/messages/fetchMessages',
  async (parameters) => getMessages(parameters),
  {
    condition: (_, {getState}) => {
      const {
        forum: {messages},
      } = getState();

      return !messages?.isLoading;
    },
  }
);

export const setSelectedTopic = createAction<SelectedTopicType>('forum/messages/selectedTopic');

export const initialState: MessagesStateType = {
  isLoading: false,
  data: [] as MessagesResponseType[],
  error: '',
  selectedTopic: {topicId: undefined, topicName: ''},
};

const MessagesSlice = createSlice({
  name: 'forum.messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state) => {
      state.error = '';
      state.isLoading = true;
    });

    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.data = action.payload;
    });

    builder.addCase(fetchMessages.rejected, (state) => {
      state.isLoading = false;
      state.data = state.data || [];
      state.error = DEFAULT_SERVER_ERROR;
    });

    builder.addCase(setSelectedTopic, (state, action) => {
      state.selectedTopic = action.payload;
    });
  },
});

export const selectMessagesIsLoading = (state: RootState): boolean => !!state.forum.messages.isLoading;

export const selectMessagesData = (state: RootState): MessagesResponseType[] => state.forum.messages.data || [];

export const selectMessagesError = (state: RootState): string => state.forum.messages.error;

export const selectSelectedTopic = (state: RootState): SelectedTopicType => state.forum.messages.selectedTopic;

export default MessagesSlice.reducer;
