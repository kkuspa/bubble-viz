import React from 'react';
import { connect } from 'react-redux';

import * as d3 from 'd3';

///////////////////////////////////////////////////////////
/////// Functions and variables
///////////////////////////////////////////////////////////

//Source: https://stackoverflow.com/questions/30330646/how-to-create-a-d3-force-layout-graph-using-react/34485379


var FORCE = (function(nsp){
  // var element = d3.select('canvas').node()
  // const bbox = d3.select("body").node().getBBox()
  // alert(element)
  var 
    // width = element.width,
    // height = element.height,
    width = 800,
    height = 400,
    color = d3.scaleOrdinal(d3.schemeCategory10),
        
    initForce = (nodes, links) => {
      nsp.force = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-200))
        .force("link", d3.forceLink(links).distance(70))
        .force("center", d3.forceCenter().x(nsp.width /2).y(nsp.height / 2))
        .force("collide", d3.forceCollide([5]).iterations([5]));
    },
  
    enterNode = (selection) => {
      var circle = selection.select('circle')
        .attr("r", 25)
        .style("fill", 'tomato' ) 
        .style("stroke", "bisque")
        .style("stroke-width", "3px")
  
      selection.select('text')
        .style("fill", "honeydew")
        .style("font-weight", "600")
        .style("text-transform", "uppercase")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .style("font-size", "10px")
        .style("font-family", "cursive")
      },
  
    updateNode = (selection) => {
      selection
        .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")
        .attr("cx", function(d) { return d.x = Math.max(30, Math.min(width - 30, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(30, Math.min(height - 30, d.y)); })
      },
  
    enterLink = (selection) => {
      selection
        .attr("stroke-width", 3)
        .attr("stroke","bisque")
    },
  
    updateLink = (selection) => {
      selection
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
    },
  
    updateGraph = (selection) => {
      selection.selectAll('.node')
        .call(updateNode)
      selection.selectAll('.link')
        .call(updateLink);
    },
  
    dragStarted = (event, d) => {
      if (!event.active) nsp.force.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y
    },
  
    dragging = (event, d) => {
      d.fx = event.x;
      d.fy = event.y
    },
        
    dragEnded = (event, d) => {
      if (!event.active) nsp.force.alphaTarget(0);
        d.fx = null;
        d.fy = null
    },
  
    drag = () => d3.selectAll('g.node')
      .call(d3.drag()
        .on("start", dragStarted)
        .on("drag", dragging)
        .on("end", dragEnded)
    ),
  
    tick = (that) => {
      that.d3Graph = d3.select(that.wrapper.current);
      nsp.force.on('tick', () => {
        that.d3Graph.call(updateGraph)
      });
    };
    
    nsp.width = width;
    nsp.height = height;
    nsp.enterNode = enterNode;
    nsp.updateNode = updateNode;
    nsp.enterLink = enterLink;
    nsp.updateLink = updateLink;
    nsp.updateGraph = updateGraph;
    nsp.initForce = initForce;
    nsp.dragStarted = dragStarted;
    nsp.dragging = dragging;
    nsp.dragEnded = dragEnded;
    nsp.drag = drag;
    nsp.tick = tick;
    
    return nsp
    
  })(FORCE || {})
  
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
      // this.handleAddNode = this.handleAddNode.bind(this)
      // this.addNode = this.addNode.bind(this)
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
      // if (prevState.nodes !== this.state.nodes || prevState.links !== this.state.links) {
      if (prevState.nodes !== this.state.nodes || prevState.links !== this.state.links) {
        const data = this.state
        FORCE.initForce(data.nodes, data.links)
        FORCE.tick(this)
        FORCE.drag()
      }
    }
    
    render() {
      console.log("LINKS:")
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
