import React from "react";
import "./styles.css";

import ExpandableGraph from "./comps/expandable";
// Random tree

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
