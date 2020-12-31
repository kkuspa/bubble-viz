import { configureStore } from '@reduxjs/toolkit'
import graphReducer from './features/graph/graphSlice'


const preloadedState = localStorage.getItem('reduxState') 
                       ? JSON.parse(localStorage.getItem('reduxState'))
                       : {}

console.log("PRELOADED STATE:")
console.log(preloadedState)

const store = configureStore({
  reducer: {
    graph: graphReducer
  },
  preloadedState: preloadedState
})

export default store;