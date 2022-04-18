import {createSlice} from '@reduxjs/toolkit';
// import {TodoState} from '../../interface';

interface Todos {
  list: any[];
}

const initialState: Todos = {
  list: [
    {
      id: 1,
      text: 'Learn Javascript',
      done: false,
    },
    {
      id: 2,
      text: 'Learn React',
      done: false,
    },
    {
      id: 3,
      text: 'Build a React App',
      done: false,
    },
  ],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
});

export default todosSlice.reducer;
