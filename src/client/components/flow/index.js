import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import CustomNode from "../custom-node";

import "reactflow/dist/style.css";

const nodeTypes = {
  custom: CustomNode,
};

console.log("nodeTypes", nodeTypes);

const initialNodes = [
  {
    id: "1",
    position: { x: 10, y: 10 },
    data: { label: "1. Loads the original Record" },
    type: "custom",
  },
  {
    id: "2",
    position: { x: 250, y: 10 },
    data: { label: "2. Loads the new record values" },
    type: "custom",
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
