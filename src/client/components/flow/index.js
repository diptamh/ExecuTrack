import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Position,
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
  const [BTdata, setBTdata] = useState([null]);
  const [BFdata, setBFdata] = useState([null]);
  const [DRdata, setDRdata] = useState([null]);
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
        data: { label: "2C. Before Executing a trigger", variant: "info" },
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
        data: { data: VRdata, label: "2D. Run custom validation rules" },
        type: "table",
      },
      {
        id: "3",
        position: { x: 1600, y: 150 },
        data: {
          // position: Position.Left,
          data: BFdata,
          label: "3. Executes 'before Save' record-triggered flow",
        },
        type: "table",
      },
      {
        id: "4",
        position: { x: 2000, y: 150 },
        data: {
          // position: Position.Left,
          data: BTdata,
          label: "4. Executes all before triggers",
        },
        type: "table",
      },
      {
        id: "5",
        position: { x: 2400, y: 150 },
        data: {
          // position: Position.Left,
          // data: BTdata,
          label: "5. Runs most system validation steps again",
        },
        type: "block",
      },
      {
        id: "6",
        position: { x: 2400, y: 500 },
        data: {
          // position: Position.Left,
          data: DRdata,
          label: "6. Executes duplicate rules",
        },
        type: "table",
      },
      {
        id: "Q3",
        position: { x: 2000, y: 500 },
        data: { label: "Duplicate record Identified and uses block action" },
        type: "diamond",
      },
      {
        id: "7",
        position: { x: 1600, y: 300 },
        data: { label: "7. Saves the record to the database" },
        type: "block",
      },
      {
        id: "STOP",
        position: { x: 1600, y: 700 },
        data: { label: "STOP" },
        type: "block",
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
        target: "2A",
        sourceHandle: "bottom",
        // targetHandle: "top", // Not working need to fix this
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
        id: "e2A-Q2",
        source: "2A",
        target: "Q2",
        sourceHandle: "right",
        // targetHandle: "bottom", // Not working need to fix this
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
        id: "eQ1-2B",
        source: "Q1",
        target: "2B",
        sourceHandle: "top",
        // targetHandle: "left",
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
        label: "Yes",
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
        id: "eQ2-3",
        source: "Q2",
        target: "3",
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
        id: "e2D-3",
        source: "2D",
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
      {
        id: "e3-4",
        source: "3",
        target: "4",
        type: "smoothstep",
        // sourceHandle: "right",
        // targetHandle: "left",
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
        id: "e4-5",
        source: "4",
        target: "5",
        type: "smoothstep",
        // sourceHandle: "right",
        // targetHandle: "left",
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
        id: "e5-6",
        source: "5",
        target: "6",
        type: "smoothstep",
        // sourceHandle: "right",
        // targetHandle: "left",
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
        id: "e6-Q3",
        source: "6",
        target: "Q3",
        type: "smoothstep",
        // sourceHandle: "right",
        // targetHandle: "left",
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
        id: "eQ3-7",
        source: "Q3",
        target: "7",
        type: "smoothstep",
        label: "No",
        // sourceHandle: "right",
        // targetHandle: "left",
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
        id: "eQ3-STOP",
        source: "Q3",
        target: "STOP",
        type: "smoothstep",
        label: "Yes",
        // sourceHandle: "right",
        // targetHandle: "left",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#12977e",
        },
        style: {
          strokeWidth: 2,
          stroke: "#12977e",
        },
      },
    ]);
  }, [VRdata]);

  // This is used to get the selected object from the child component and set it to the state
  const handleObjectSelection = async (selected) => {
    const automationData = await APIService.getAllAutomation(selected);

    // Validation Rule
    const VRdata = automationData.data.validation.records.map((record) => {
      return record.ValidationName;
    });
    setVRdata(() => {
      return VRdata;
    });

    // Before Trigger
    const BTdata = automationData.data.beforeTrigger.records.map((record) => {
      return record.Name;
    });
    setBTdata(() => {
      return BTdata;
    });

    // Before Flow
    const BFdata = automationData.data.beforeFlow.records.map((record) => {
      return record.ApiName;
    });

    setBFdata(() => {
      return BFdata;
    });

    // Duplicate Rule
    const DRdata = automationData.data.duplicateRule.records.map((record) => {
      return record.DeveloperName;
    });
    setDRdata(() => {
      return DRdata;
    });
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Box width={400}>
        {/* This is used to select the object and get the object from the child object */}
        <ObjectSelector OnObjectSelection={handleObjectSelection} />
      </Box>
      <ReactFlow
        nodesDraggable={true}
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
