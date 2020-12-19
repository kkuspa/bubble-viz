import { combineReducers } from 'redux'
import graphReducer from './features/graph/graphSlice'

const rootReducer = combineReducers({
    graph: graphReducer
})

// // Use the initialState as a default value
// export default function appReducer(state = {}, action) {
//     // The reducer normally looks at the action type field to decide what happens
//     return {
//         nodes: nodeReducer(state.nodes, action),
//         // edges: edgeReducer(state.edges, action)
//     }
// }
export default rootReducer
