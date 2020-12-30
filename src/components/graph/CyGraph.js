import React from 'react';
import { connect } from 'react-redux';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import CytoscapeComponent from 'react-cytoscapejs';
cytoscape.use( cola );

class CyGraph extends React.Component {
  state = {
    w: 800,
    h: 400,
  }

  componentDidMount = () => {
    // this.setState({
    //   w: window.innerWidth,
    //   h: window.innerHeight
    // })
    this.setupListeners()
  }
  
  setupListeners = () => {
    this.cy.on('click', 'node', (event) => {
      console.log(event.target)
    })
  }

  render(){
    const nodes = this.props.nodes.map((node) => {
        return { data: { id: parseInt(node.id), label: node.name }}
    })
    const edges = this.props.edges.map((edge) => {
      return {
        ...edge,
        data: {
          id: edge.data.id,
          source: parseInt(edge.data.source),
          target: parseInt(edge.data.target)
        }
      }
    })

    // console.log("CyGraph Nodes:")
    // console.log(nodes)
    // console.log("CyGraph Edges:")
    // console.log(edges)

    const elements = CytoscapeComponent.normalizeElements({nodes: nodes, edges: edges})
    let layout = { name: 'cola', infinite: true }

    // console.log("CyGraph Elements")
    // console.log(elements)

    if (this.cy) {
      console.log("Has CY!")
      console.log(this.cy.elements())
      console.log(this.cy.elements('node[label = "Alex"]'))
      console.log(this.cy.$('node:selected').connectedEdges())
    } else {
      console.log("Cytoscape not yet initialized.")
    }

    return(
      <div>
        <CytoscapeComponent cy={(cy) => { this.cy = cy }}
            elements={elements} layout={layout}
            style={ {width: this.state.w, height: this.state.h } }
        />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
    return {
      nodes: state.graph.nodes,
      edges: state.graph.edges
    }
  }

export default connect(
    mapStateToProps,
    null
  )(CyGraph);
  