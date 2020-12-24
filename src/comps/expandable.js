import React, { useState } from "react";
import { ForceGraph2D, ForceGraph3D } from "react-force-graph";
import {
  get_shemantic_paper,
  process_shemantic_data,
  get_shemantic_paper_infl,
} from "../api";
export default function ExpandableGraph({ graphData, root_id }) {
  const [prunedTree, setPrunedTree] = useState(graphData);
  const [view, setView] = useState("3d");
  const handleNodeClick = async (node) => {
    //  node.collapsed = !node.collapsed; // toggle collapse state
    const data = await get_shemantic_paper(node.id);
    console.log("got data");
    //console.log(data);
    const nodes = process_shemantic_data(data, 5);
    console.log(nodes);
    // todo  fix duplicate

    await Promise.all(
      nodes.map(async (node_) => {
        const infl = await get_shemantic_paper_infl(node_.id);
        const newLink =
          node_.group === "cit"
            ? { source: node.id, target: node_.id, type: "cit" }
            : { source: node_.id, target: node.id, type: "ref" };
        setPrunedTree(({ nodes, links }) => {
          return {
            nodes: [
              ...nodes,
              {
                id: node_.id,
                title: node_.title,
                year: node_.year,
                infl: infl,
              },
            ],
            links: [...links, newLink],
          };
        });
      })
    );
  };
  //console.log(prunedTree);
  const graphProps = {
    graphData: prunedTree,
    linkDirectionalArrowLength: 3.5,
    linkDirectionalArrowRelPos: 1,
    linkCurvature: 0.25,

    linkWidth: 1,
    nodeId: "id",
    nodeLabel: "title",
    nodeVal: "infl",
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
