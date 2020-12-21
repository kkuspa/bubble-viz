import { ADD_NODE } from '../../redux/actionTypes'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    nodes: [
        { id: 0, name: 'Alex' },
        { id: 1, name: 'Kai' },
        { id: 2, name: 'Iryna' },
        { id: 3, name: 'Shalini' },
    ],
    edges: [
      [1, 3],
      [1, 2]
    ]
}

function nextNodeId(nodes) {
    console.log("Computing next node id")
    const maxId = nodes.reduce((maxId, node) => Math.max(node.id, maxId), -1)
    return maxId + 1
}

const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    addNode(state, action) {
      state.nodes.push({
        id: nextNodeId(state.nodes),
        name: action.payload
      })
      console.log("graphslicereducer")
    }
  }
})

export const { addNode } = graphSlice.actions
export default graphSlice.reducer