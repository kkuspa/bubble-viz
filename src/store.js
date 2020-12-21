import { configureStore } from '@reduxjs/toolkit'
import graphReducer from './features/graph/graphSlice'


let preloadedState
const persistedTodosString = localStorage.getItem('graph')

if (persistedTodosString) {
  preloadedState = {
    graph: JSON.parse(persistedTodosString)
  }
}

const store = configureStore({
  reducer: {
    graph: graphReducer
  },
  preloadedState: preloadedState
})
export default store;
