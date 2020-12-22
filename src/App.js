import React from "react";
import "./styles.css";
import { ForceGraph3D } from "react-force-graph";
// Random tree

const gData = {
  nodes: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
  links: [
    {
      source: 1,
      target: 2
    },
    {
      source: 1,
      target: 4
    },
    {
      source: 1,
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
      <ForceGraph3D graphData={gData} />
    </div>
  );
}
