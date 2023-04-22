import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import Block from "../shapes/block";
import Diamond from "../shapes/diamond";

import "reactflow/dist/style.css";

const nodeTypes = {
  block: Block,
  diamond: Diamond,
};

console.log("nodeTypes", nodeTypes);

const initialNodes = [
  {
    id: "1",
    position: { x: 10, y: 200 },
    data: { label: "1. Loads the original Record" },
    type: "block",
  },
  {
    id: "2",
    position: { x: 250, y: 200 },
    data: { label: "2. Loads the new record values" },
    type: "block",
  },
  {
    id: "Q1",
    position: { x: 500, y: 160 },
    data: { label: "Did the request come from a standard UI edit page ?" },
    type: "diamond",
  },
  {
    id: "2B",
    position: { x: 900, y: 400 },
    data: { label: "Salesforce validates only the foreign keys" },
    type: "block",
  },
];
const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-Q1", source: "2", target: "Q1" },
  {
    id: "eQ1-2B",
    source: "Q1",
    target: "2B",
    sourceHandle: "c",
  },
];

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
