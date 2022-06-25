import {
  AnyAction, createSlice, isFulfilled, isPending, isRejectedWithValue, PayloadAction,
} from '@reduxjs/toolkit';
import {getTheme, setTheme} from './actions';

export enum EThemes {
  none,
  light,
  dark,
}

interface IUserState {
  loading: boolean;
  error: string;
  theme: EThemes;
}

const initialState: IUserState = {
  loading: false,
  error: '',
  theme: EThemes.light,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addMatcher(
      isFulfilled(getTheme, setTheme),
      (state, action: PayloadAction<string | number>) => {
        state.loading = false;
        state.error = '';
        state.theme = action.payload ? EThemes.light : +action.payload;
      },
    )
    .addMatcher(isRejectedWithValue(getTheme, setTheme), (state, action: AnyAction) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addMatcher(isPending(getTheme, setTheme), (state) => {
      state.loading = true;
    }),
});

export default themeSlice.reducer;
