import { ADD_NODE, ADD_EDGE } from './actionTypes'

let nextNodeId = 0
export const addNode = content => ({
  type: ADD_NODE,
  payload: {
    id: ++nextNodeId,
    content
  }
})

let nextEdgeId = 0
export const addEdge = content => ({
  type: ADD_EDGE,
  payload: {
    id: nextEdgeId,
    content
  }
})