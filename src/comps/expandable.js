import React, { useState } from "react";
import { ForceGraph2D, ForceGraph3D } from "react-force-graph";
import { get_shemantic_paper, process_shemantic_data } from "../api";
export default function ExpandableGraph({ graphData, root_id }) {
  const [prunedTree, setPrunedTree] = useState(graphData);
  const [view, setView] = useState("2d");
  const handleNodeClick = async (node) => {
    //  node.collapsed = !node.collapsed; // toggle collapse state
    const data = await get_shemantic_paper(node.id);
    console.log("got data");
    //console.log(data);
    const nodes = process_shemantic_data(data, 5);
    console.log(nodes);
    // todo  fix duplicate
    nodes.map((node_) => {
      const newLink =
        node_.group === "cit"
          ? { source: node.id, target: node_.id, type: "cit" }
          : { source: node_.id, target: node.id, type: "ref" };
      setPrunedTree(({ nodes, links }) => {
        return {
          nodes: [
            ...nodes,
            { id: node_.id, title: node_.title, year: node_.year },
          ],
          links: [...links, newLink],
        };
      });
    });
  };
  //console.log(prunedTree);
  const graphProps = {
    graphData: prunedTree,
    linkDirectionalArrowLength: 3.5,
    linkDirectionalArrowRelPos: 1,
    linkCurvature: 0.25,
    linkAutoColorBy: (d) => {
      if (d.type === "cit") {
        const node = prunedTree.nodes.filter((node) => node.id === d.target)[0];
        console.log(node);
        return node.year;
      } else {
        const node = prunedTree.nodes.filter((node) => node.id === d.source)[0];
        return node.year;
      }
    },
    linkWidth: 1,
    nodeId: "id",
    nodeLabel: "title",
    linkDirectionalParticles: 2,
    onNodeClick: handleNodeClick,
  };
  return (
    <div>
      <button onClick={() => setView(view === "2d" ? "3d" : "2d")}>
        change view
      </button>
      {view === "2d" ? (
        <ForceGraph2D {...graphProps} />
      ) : (
        <ForceGraph3D {...graphProps} />
      )}
    </div>
  );
}
