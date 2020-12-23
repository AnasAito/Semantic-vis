import React, { useState, useMemo, useCallback } from "react";
import { ForceGraph3D } from "react-force-graph";
export default function ExpandableGraph({ graphData }) {
  const [prunedTree, setPrunedTree] = useState(graphData);

  const handleNodeClick = useCallback((node) => {
    //  node.collapsed = !node.collapsed; // toggle collapse state
    const newNodes = [{ id: 19 }, { id: 20 }];
    const newLinks = [
      { target: 19, source: node.id },
      { target: 20, source: node.id }
    ];
    const Nodes = [...prunedTree.nodes, ...newNodes];
    const Links = [...prunedTree.links, ...newLinks];

    setPrunedTree({ nodes: Nodes, links: Links });
  }, []);

  return (
    <ForceGraph3D
      graphData={prunedTree}
      linkDirectionalParticles={2}
      onNodeClick={handleNodeClick}
    />
  );
}
