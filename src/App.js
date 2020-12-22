import React from "react";
import "./styles.css";
import { ForceGraph3D } from "react-force-graph";
// Random tree

const gData = {
  nodes: [
    { id: "Learning Task Knowledge from Dialog and Web Access" },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 }
  ],
  links: [
    {
      source: 3,
      target: 2
    },
    {
      source: "Learning Task Knowledge from Dialog and Web Access",
      target: 4
    },
    {
      source: "Learning Task Knowledge from Dialog and Web Access",
      target: 5
    },
    {
      source: 3,
      target: 4
    }
  ]
};

export default function App() {
  console.log(gData);
  return (
    <div className="App">
      <ForceGraph3D
        graphData={gData}
        nodeLabel={"id"}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
        backgroundColor={"#000011"}
      />
    </div>
  );
}
