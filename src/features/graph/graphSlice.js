import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    node_ids: [0, 1, 2, 3],
    node_data: {
      0: { name: 'Alex', id: 0 },
      1: { name: 'Kai', id: 1 },
      2: { name: 'Iryna', id: 2 },
      3: { name: 'Shalini', id: 3 },
    },
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


function nextNodeIdId(node_ids) {
  console.log("Computing next node id id")
  const maxId = node_ids.length
  return maxId
}

const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    addNode(state, action) {
      const nextId = nextNodeIdId(state.node_ids)
      state.node_ids.push(nextId)
      state.node_data[nextId] = { name: action.payload }
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