import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { FORCE } from './Force'

  
  ////////////////////////////////////////////////////////////////////////////
  /////// class App is the parent component of Link and Node
  ////////////////////////////////////////////////////////////////////////////
  
  class AppGraph extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        addLinkArray: [], 
        name: "",
        node_ids: props.node_ids,
        nodes: [...props.node_ids].map( (node_id) => {
            return Object.assign({}, this.props.nodes[node_id])
        }),
        links: [...props.links].map( (link) => {
          return Object.assign({}, link)
        }),
      }
      this.wrapper = React.createRef()
    }

    static getDerivedStateFromProps(props, state) {
      /* On required prop updates from the wtore, modify state so that we maintain a copy of the
        correct props in the component state.

        This is required since D3 retains its own copy of state in particular with the nodes and
        links to run all of the animation computation.  It will add attributes such as
        ['x', 'y', 'vx', 'vy', 'index'], which if directly connected to the redux store will result
        in state mutations.
      */
      let newState = {...state}
      if (props.node_ids !== state.node_ids) {
        const newNodeIds = props.node_ids.filter(x => !state.node_ids.includes(x))
        const newNodes = newNodeIds.map(node_id => { return Object.assign({}, props.nodes[node_id])})
        newState.nodes = state.nodes.concat(newNodes)
        newState.node_ids = state.node_ids.concat(newNodeIds)
      }

      if (props.links !== state.links) {
        newState.links = props.links
      }

      return newState;
    }
    
    componentDidMount() {
      const data = this.state
      FORCE.initForce(data.nodes, data.links)
      FORCE.tick(this)
      FORCE.drag()
  }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.nodes !== this.state.nodes || prevState.links !== this.state.links) {
        const data = this.state
        FORCE.initForce(data.nodes, data.links)
        FORCE.tick(this)
        FORCE.drag()
      }
    }
    
    render() {
      console.log("RENDER LINKS:")
      console.log(this.state.links)
      var links = this.state.links.map( (link) => {
          return (
              <Link
                  key={link.id}
                  data={link}
              />);
      });
      var nodes = this.state.nodes.map((node) => {
        return (
          <Node
              data={node}
              name={node.name}
              key={node.id}
          />);
      });

      return (
        <div className="graph_container" ref={this.wrapper}>
          <svg className="graph" width={FORCE.width} height={FORCE.height}>
              <g>
                  {links}
              </g>
              <g>
                  {nodes}
              </g>
          </svg>
        </div>
      );
    }
  }
  
  ///////////////////////////////////////////////////////////
  /////// Link component
  ///////////////////////////////////////////////////////////
  
  class Link extends React.Component {
    constructor(props) {
      super(props)
      this.wrapper = React.createRef()
    }

      componentDidMount() {
        this.d3Link = d3.select(this.wrapper.current)
          .datum(this.props.data)
          .call(FORCE.enterLink)
      }
    
      componentDidUpdate() {
        this.d3Link.datum(this.props.data)
          .call(FORCE.updateLink);
      }
  
      render() {
        return (
          <line className='link' ref={this.wrapper}/>
        );
      }
  }
  
  ///////////////////////////////////////////////////////////
  /////// Node component
  ///////////////////////////////////////////////////////////
  
  class Node extends React.Component {
    constructor(props) {
      super(props)
      this.wrapper = React.createRef()
    }

      componentDidMount() {
        this.d3Node = d3.select(this.wrapper.current)
          .datum(this.props.data)
          .call(FORCE.enterNode)
      }
  
      componentDidUpdate() {
        this.d3Node.datum(this.props.data)
          .call(FORCE.updateNode)
      }
  
      render() {
        return (
          <g className='node' ref={this.wrapper}>
            <circle onClick={this.props.addLink}/>
            <text>{this.props.data.name}</text>
          </g>
        );
      }
  }


const mapStateToProps = function(state) {
  return {
    nodes: state.graph.nodes,
    node_ids: state.graph.node_ids,
    links: state.graph.edges.map((edge) => {
      return Object.assign({}, edge.data)
    })
  }
}


export default connect(
  mapStateToProps,
  null
)(AppGraph);
