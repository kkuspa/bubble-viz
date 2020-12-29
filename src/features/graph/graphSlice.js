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
    ],
    cyEdges: [
      { data: { source: 1, target: 3 }},
      { data: { source: 1, target: 2 }}
      // { data: { id: 100, source: 1, target: 3 }},
      // { data: { id: 101, source: 1, target: 2 }}
    ]
}

function nextNodeId(nodes) {
    console.log("Computing next node id")
    const maxId = nodes.reduce((maxId, node) => Math.max(node.id, maxId), -1)
    return maxId + 1
}

function nextEdgeId(edges) {
  console.log("Computing next edge id")
  const maxId = edges.reduce((maxId, edge) => Math.max(edge.id, maxId), -1)
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
      console.log("ADDNODEREDUCER")
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
      state.cyEdges.push({
        id: nextEdgeId(state.cyEdges),
        source: action.payload.source,
        target: action.payload.target
      })
      console.log("ADDEDGEREDUCER")
      console.log(state)
            // },
      // prepare(text) {
      //   return 
      // }
    }
  }
})

export const { addNode, addEdge } = graphSlice.actions
export default graphSlice.reducer