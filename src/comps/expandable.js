import React, { useState } from "react";
import { ForceGraph3D } from "react-force-graph";
import { get_shemantic_paper, process_shemantic_data } from "../api";
export default function ExpandableGraph({ graphData, root_id }) {
  const [prunedTree, setPrunedTree] = useState(graphData);

  const handleNodeClick = async (node) => {
    //  node.collapsed = !node.collapsed; // toggle collapse state
    const data = await get_shemantic_paper(node.id);
    console.log("got data");
    //console.log(data);
    const nodes = process_shemantic_data(data, 2);
    // todo  fix duplicate
    nodes.map((node_) => {
      const newLink =
        node_.group === "cit"
          ? { source: node.id, target: node_.id }
          : { source: node_.id, target: node.id };
      setPrunedTree(({ nodes, links }) => {
        return {
          nodes: [...nodes, { id: node_.id }],
          links: [...links, newLink]
        };
      });
    });
  };
  console.log(prunedTree);
  return (
    <ForceGraph3D
      graphData={prunedTree}
      linkDirectionalArrowLength={3.5}
      linkDirectionalArrowRelPos={1}
      linkCurvature={0.25}
      //enableNodeDrag={false}
      linkDirectionalParticles={2}
      onNodeClick={handleNodeClick}
    />
  );
}
