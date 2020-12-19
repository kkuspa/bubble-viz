import { ADD_NODE } from '../../redux/actionTypes'

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

export default function graphReducer(state = initialState, action) {
  switch (action.type) {
      case ADD_NODE:
          return {
              ...state,
              nodes: [
                ...state.nodes,
                {
                  id: nextNodeId(state.nodes),
                  name: action.payload
                }
              ]
          }
      default:
          return state
  }
}
