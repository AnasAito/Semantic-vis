import React from "react";
import "./styles.css";

import ExpandableGraph from "./comps/expandable";
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
const genRandomTree = (N = 300, reverse = false) => {
  return {
    nodes: [...Array(N).keys()].map((i) => ({ id: i })),
    links: [...Array(N).keys()]
      .filter((id) => id)
      .map((id) => ({
        [reverse ? "target" : "source"]: id,
        [reverse ? "source" : "target"]: Math.round(Math.random() * (id - 1))
      }))
  };
};
export default function App() {
  console.log(gData);
  return (
    <div className="App">
      <ExpandableGraph graphData={genRandomTree(20, true)} />
    </div>
  );
}
