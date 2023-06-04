import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "reactflow";
import { Box } from "@mui/material";
import Block from "../shapes/block";
import Diamond from "../shapes/diamond";
import axios from "axios";
import ObjectSelector from "../objectSelector/index.js";
import APIService from "../../service/APIService.js";

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
    position: { x: 1200, y: 100 },
    data: { label: "Were multi-line items created ?" },
    type: "diamond",
  },
  {
    id: "2D",
    position: { x: 1600, y: 5 },
    data: {
      label: "2D. Run custom validation rules",
      variant: "info",
      // table: {
      //   columns: [
      //     { field: "name", headerName: "Name", width: 130 },
      //     { field: "calories", headerName: "Calories", width: 130 },
      //     { field: "fat", headerName: "Fat", width: 130 },
      //     { field: "carbs", headerName: "Carbs", width: 130 },
      //   ],
      //   rows: [
      //     { id: 1, name: "Frozen yoghurt", calories: 159, fat: 6.0, carbs: 24 },
      //     {
      //       id: 2,
      //       name: "Ice cream sandwich",
      //       calories: 237,
      //       fat: 9.0,
      //       carbs: 37,
      //     },
      //     { id: 3, name: "Eclair", calories: 262, fat: 16.0, carbs: 24 },
      //     { id: 4, name: "Cupcake", calories: 305, fat: 3.7, carbs: 67 },
      //   ],
      // },
    },
    type: "block",
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
  {
    id: "eQ2-2D",
    source: "Q2",
    target: "2D",
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
  const [selectedObject, setSelectedObject] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // This is used to get the selected object from the child component and set it to the state
  const handleObjectSelection = async (selected) => {
    setSelectedObject(selected);
    const validationRules = await APIService.getValidations(selected);
    console.log("validationRules->", validationRules.data.records);
    // const newNodes = validationRules.data.records.map((record, index) => {
    //   return {
    //     id: index,
    //     position: { x: 10, y: 200 },
    //     data: { label: record.Name, variant: "warn" },
    //     type: "block",
    //   };
    // });
    // setNodes(newNodes);

    // const newEdges = validationRules.data.records.map((record, index) => {
    //   return {
    //     id: index,
    //     source: index,
    //     target: index + 1,
    //     markerEnd: {
    //       type: MarkerType.ArrowClosed,
    //       color: "#413978",
    //     },
    //     style: {
    //       strokeWidth: 2,
    //       stroke: "#413978",
    //     },
    //   };
    // });
    // setEdges(newEdges);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Box width={400}>
        {/* THis is used to select the object and get the object from the child object */}
        <ObjectSelector OnObjectSelection={handleObjectSelection} />
      </Box>
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
