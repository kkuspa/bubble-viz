import React from 'react'
import { useSelector } from 'react-redux'

export const NodeList = () => {
  const nodes = useSelector(state => state.graph.nodes)
  console.log("Rendering nodelist")
  console.log(nodes)
  const renderedListItems = nodes.map(node => {
    return <li key={node.id}>{node.name}</li>
  })

  return <ul className="node-list">{renderedListItems}</ul>
}
