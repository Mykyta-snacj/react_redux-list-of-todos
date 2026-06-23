import { combineReducers, createStore } from 'redux';
// import { composeWithDevTools } from '@redux-devtools/extension';
import todos from '../features/todos';
import filter from '../features/filter';

const reducer = combineReducers({
  todos,
  filter,
});

const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;

export default store;
