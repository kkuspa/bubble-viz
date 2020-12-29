import React from 'react';
import { connect } from 'react-redux';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import CytoscapeComponent from 'react-cytoscapejs';
cytoscape.use( cola );

class CyGraph extends React.Component {
  render(){
    const nodes = this.props.nodes.map((node) => {
        return { data: { id: parseInt(node.id), label: node.name }}
    })
    const edges = this.props.cyEdges.map((edge) => {
      return {
        ...edge,
        data: {
          id: edge.data.id,
          source: parseInt(edge.data.source),
          target: parseInt(edge.data.target)
        }
      }
    })

    console.log("CyGraph Nodes:")
    console.log(nodes)
    console.log("CyGraph Edges:")
    console.log(edges)

    const elements = CytoscapeComponent.normalizeElements({nodes: nodes, edges: edges})
    let layout = { name: 'cola', infinite: true }

    console.log("CyGraph Elements")
    console.log(elements)

    return <CytoscapeComponent cy={(cy) => { this.cy = cy }}
            elements={elements} layout={layout}
            style={ {width: '800px', height: '400px' } } />;
  }
}

const mapStateToProps = function(state) {
    return {
      nodes: state.graph.nodes,
      cyEdges: state.graph.cyEdges
    }
  }

export default connect(
    mapStateToProps,
    null
  )(CyGraph);
  