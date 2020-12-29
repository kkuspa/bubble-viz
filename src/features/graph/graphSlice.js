import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid4 } from 'uuid';

const initialState = {
  node_ids: [0, 1, 2, 3],
  nodes: [
      { id: 0, name: 'Alex' },
      { id: 1, name: 'Kai' },
      { id: 2, name: 'Iryna' },
      { id: 3, name: 'Shalini' },
  ],
  edges: [
    { data: { source: 1, target: 3, id: uuid4() }},
    { data: { source: 1, target: 2, id: uuid4() }}
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
      state.nodes.push({
        id: nextNodeId(state.nodes),
        name: action.payload
      })
      console.log("STATE_AFTER_ADD_NODE_REDUCER")
      console.log(state)
    },
        /*Edge tasks
        1) User inputs A and B
          - Convert strings "A" and "B" to nodeID(A) nodeID(b)
          - Nodes should be normalized state entities
          - e.g. nodeIDs = [...]
              - nodes = { nodeId: nodeInfo (e.g. name, metadata)}
              
        2) Check that A and B are BOTH valid nodes that exist in the graph
        3) Insert edge if DNE
      */
      // reducer(state, action) {

    addEdge(state, action) {
      console.log("ADD_EDGE_ACTION")
      console.log(action)
      state.edges.push(
        {
          data: {
            id: uuid4(),
            source: parseInt(action.payload.source),
            target: parseInt(action.payload.target)
          }
        }
      )
      console.log("STATE_AFTER_ADD_EDGE_REDUCER")
      console.log(state)
    }
  }
})

export const { addNode, addEdge } = graphSlice.actions
export default graphSlice.reducer