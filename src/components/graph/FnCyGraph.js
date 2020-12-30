import React from 'react';
import { useSelector } from 'react-redux';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import CytoscapeComponent from 'react-cytoscapejs';

import { NodeIdExists } from '../utils/selectors'
cytoscape.use( cola );


const FnCyGraph = () => {
    const stateNodes = useSelector(state => state.graph.nodes)
    const stateEdges = useSelector(state => state.graph.edges)

    const nodes = stateNodes.map((node) => {
        return { data: { id: parseInt(node.id), label: node.name }}
    })
    const edges = stateEdges.map((edge) => {
      return {
        ...edge,
        data: {
          id: edge.data.id,
          source: parseInt(edge.data.source),
          target: parseInt(edge.data.target)
        }
      }
    })
    console.log("name test")
    console.log(nodes[0])
    console.log(NodeIdExists(nodes[0].data.label))

    const elements = CytoscapeComponent.normalizeElements({nodes: nodes, edges: edges})
    let layout = { name: 'cola', infinite: true }

    return <CytoscapeComponent //cy={(cy) => { this.cy = cy }}
            elements={elements} layout={layout}
            style={ {width: '800px', height: '400px' } } />
}

export default FnCyGraph;
