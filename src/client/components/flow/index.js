import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "reactflow";
import Block from "../shapes/block";
import Diamond from "../shapes/diamond";
import axios from "axios";

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
    data: { label: "1. Loads the original Record", variant: "warn" },
    type: "block",
  },
  {
    id: "2",
    position: { x: 250, y: 200 },
    data: { label: "2. Loads the new record values", variant: "warn" },
    type: "block",
  },
  {
    id: "Q1",
    position: { x: 510, y: 165 },
    data: { label: "Did the request come from a standard UI edit page ?" },
    type: "diamond",
  },
  {
    id: "2B",
    position: { x: 510, y: 5 },
    data: {
      label: "2B. Salesforce validates only the foreign keys",
      variant: "info",
    },
    type: "block",
  },
  {
    id: "2A",
    position: { x: 900, y: 400 },
    data: {
      label: "2A. Runs system validation to check for:",
      variant: "info",
    },
    type: "block",
  },
  {
    id: "2C",
    position: { x: 900, y: 5 },
    data: {
      label: "2C. Before Executing a trigger",
      variant: "info",
    },
    type: "block",
  },
  {
    id: "Q2",
    position: { x: 1200, y: 5 },
    data: { label: "Were multi-line items created ?" },
    type: "diamond",
  },
];
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#413978",
    },
    style: {
      strokeWidth: 2,
      stroke: "#413978",
    },
  },
  {
    id: "e2-Q1",
    source: "2",
    target: "Q1",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#413978",
    },
    style: {
      strokeWidth: 2,
      stroke: "#413978",
    },
  },
  {
    id: "eQ1-2A",
    source: "Q1",
    target: "2B",
    sourceHandle: "top",
    targetHandle: "bottom", // Not working need to fix this
    label: "Yes",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#12977e",
    },
    style: {
      strokeWidth: 2,
      stroke: "#12977e",
    },
  },
  {
    id: "eQ1-2B",
    source: "Q1",
    target: "2A",
    sourceHandle: "bottom",
    type: "smoothstep",
    label: "No",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#ca2936",
    },
    style: {
      strokeWidth: 2,
      stroke: "#ca2936",
    },
  },
  {
    id: "e2B-2C",
    source: "2B",
    target: "2C",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#413978",
    },
    style: {
      strokeWidth: 2,
      stroke: "#413978",
    },
  },
  {
    id: "e2C-Q2",
    source: "2C",
    target: "Q2",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#413978",
    },
    style: {
      strokeWidth: 2,
      stroke: "#413978",
    },
  },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // call on component mount
  useEffect(() => {
    // /api/v1/salesforce/query
    axios.get("/api/v1/salesforce/query").then((res) => {
      console.log("sample query response", res);
    });
  }, []);

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
