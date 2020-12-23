import React from "react";
import "./styles.css";

import ExpandableGraph from "./comps/expandable";
// Random tree

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
  const init_data = {
    nodes: [{ id: "0796f6cd7f0403a854d67d525e9b32af3b277331", group: 0 }],
    links: []
  };
  return (
    <div className="App">
      <ExpandableGraph graphData={init_data} />
    </div>
  );
}
