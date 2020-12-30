import { useSelector } from 'react-redux'

function NodeIdExists(newName) {
    const nodeNameMap = useSelector(state => state.graph.nodeNameMap)
    return newName in nodeNameMap
}

export { NodeIdExists }