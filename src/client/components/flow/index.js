import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import { Box } from "@mui/material";
import Block from "../shapes/block";
import Diamond from "../shapes/diamond";
import Table from "../table/index.js";
// used to select the object and get the object from the child object
import ObjectSelector from "../objectSelector/index.js";
// used to do all the axios calls to get the data from the salesforce
import APIService from "../../service/APIService.js";
import "reactflow/dist/style.css";

export default function App() {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [VRdata, setVRdata] = useState([null]);
  const [nodeTypes, setNodeTypes] = useState({
    block: Block,
    diamond: Diamond,
    table: Table,
  });

  useEffect(() => {
    setNodeTypes(() => {
      return {
        block: Block,
        diamond: Diamond,
        table: Table,
      };
    });

    setNodes([
      {
        id: "1",
        position: { x: 10, y: 200 },
        data: { label: "1. Loads the original Record", variant: "warn" },
        type: "block",
      },
      ,
      {
        id: "2",
        position: { x: 250, y: 200 },
        data: { label: "2. Loads the new record values", variant: "warn" },
        type: "block",
      },
      {
        id: "3",
        position: { x: 500, y: 200 },
        data: { data: VRdata },
        type: "table",
      },
    ]);

    setEdges([
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
        target: "3",
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
    ]);
  }, [VRdata]);

  // This is used to get the selected object from the child component and set it to the state
  const handleObjectSelection = async (selected) => {
    const validationRules = await APIService.getValidations(selected);

    const VRdata = validationRules.data.records.map((record) => {
      return record.ValidationName;
    });

    // Validation Set is the object name
    setVRdata(() => {
      return VRdata;
    });

    console.log("VRdata->", VRdata);
    // updated the table component aftet the data is set
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Box width={400}>
        {/* This is used to select the object and get the object from the child object */}
        <ObjectSelector OnObjectSelection={handleObjectSelection} />
      </Box>
      <ReactFlow
        nodesDraggable={false}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
