import React from 'react';
import ReactDOM from 'react-dom';
import { connect, useSelector } from 'react-redux';

import CytoscapeComponent from 'react-cytoscapejs';

class CyGraph extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    // const elements = [
    //    { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
    //    { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
    //    { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
    // ];
    // let elements = {}
    const nodes = this.props.nodes.map((node) => {
        return { data: { id: parseInt(node.id), label: node.name }}
    })

    // const edges = this.props.cyEdges.map((edge) => {
    //     return Object.assign({}, edge)
    // })
    const edges = []

    console.log("CyGraph Nodes:")
    console.log(nodes)
    console.log("CyGraph Edges:")
    console.log(edges)

    // const elements = CytoscapeComponent.normalizeElements({nodes: nodes, edges: edges})
    const elements = nodes.concat(edges)

    console.log("CyGraph Elements")
    console.log(elements)
    return <CytoscapeComponent cy={(cy) => { this.cy = cy }}
            elements={elements} 
            style={ { width: '800px', height: '400px' } } />;
  }
}

const mapStateToProps = function(state) {
    return {
      nodes: state.graph.nodes,
      node_ids: state.graph.node_ids,
      node_data: state.graph.node_data,
      edges: state.graph.edges,
      cyEdges: state.graph.cyEdges
    }
  }

// ReactDOM.render( React.createElement(CyGraph), document.getElementById('CyGraph')));
export default connect(
    mapStateToProps,
    null
  )(CyGraph);
  