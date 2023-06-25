import React, { useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
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
  const [ATdata, setATdata] = useState([null]);
  const [ARdata, setARdata] = useState([null]);
  const [AResdata, setAResdata] = useState([null]);
  const [WFdata, setWFdata] = useState([null]);
  const [AFdata, setAFdata] = useState([null]);
  const [EPdata, setEPdata] = useState([null]);
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
        position: { x: 10, y: -300 },
        data: {
          label: "1. Loads the original Record",
          variant: "warn",
          body: "Loads the original record values from the database or initializes the record for an upsert statement.",
        },
        type: "block",
      },
      {
        id: "2",
        position: { x: 310, y: -300 },
        data: {
          label: "2. Loads the new record values",
          variant: "warn",
          body: "Loads the new record field values from the request and overwrites the old values.",
        },
        type: "block",
      },
      {
        id: "Q1",
        position: { x: 610, y: -335 },
        data: { label: "Did the request come from a standard UI edit page ?" },
        type: "diamond",
      },
      {
        id: "2B",
        position: { x: 650, y: -50 },
        data: {
          label: "2B. Salesforce validates only the foreign keys",
          variant: "info",
        },
        type: "block",
      },
      {
        id: "2A",
        position: { x: 950, y: -500 },
        data: {
          label: "2A. Runs system validation to check for:",
          variant: "info",
          body: "Compliance with layout-specific rules, Required values at the layout level, Valid field formats, Maximum field length",
        },
        type: "block",
      },
      {
        id: "2C",
        position: { x: 950, y: -50 },
        data: {
          label: "2C. Before Executing a trigger",
          variant: "info",
          body: "Salesforce verifies that any custom foreign keys do not refer to the object itself.",
        },
        type: "block",
      },
      {
        id: "Q2",
        position: { x: 1250, y: -335 },
        data: {
          label:
            "Were multi-line items created, or is the request from a User Object on a standard UI edit page ?",
        },
        type: "diamond",
      },
      {
        id: "2D",
        position: { x: 1650, y: -500 },
        data: {
          data: VRdata,
          label: "2D. Run custom validation rules",
          variant: "success",
        },
        type: "table",
      },
      {
        id: "3",
        position: { x: 1650, y: -200 },
        data: {
          data: BFdata,
          label: "3. Executes 'before Save' record-triggered flow",
          variant: "success",
        },
        type: "table",
      },
      {
        id: "4",
        position: { x: 2100, y: -200 },
        data: {
          data: BTdata,
          label: "4. Executes all before triggers",
          variant: "success",
        },
        type: "table",
      },
      {
        id: "5",
        position: { x: 2400, y: -250 },
        data: {
          label: "5. Runs most system validation steps again",
          body: "Such a verifying that all required fields have a non-null value, Runs any custom validation rules, Does NOT run layout-specific rules if the request comes from a standard UI edit page",
        },
        type: "block",
      },
      {
        id: "6",
        position: { x: 2436, y: 300 },
        data: {
          data: DRdata,
          label: "6. Executes duplicate rules",
          variant: "success",
        },
        type: "table",
      },
      {
        id: "Q3",
        position: { x: 2000, y: 265 },
        data: { label: "Duplicate record Identified and uses block action" },
        type: "diamond",
      },
      {
        id: "7",
        position: { x: 1750, y: 200 },
        data: { label: "7. Saves the record to the database" },
        type: "block",
      },
      {
        id: "STOP",
        position: { x: 1800, y: 450 },
        data: {
          label: "The record is NOT Saved",
          body: "No further steps such as after triggers and workflow rules are taken. ",
          variant: "danger",
        },
        type: "block",
      },
      {
        id: "8",
        position: { x: 1450, y: 200 },
        data: {
          label: "8. Executes all after triggers",
          data: ATdata,
          variant: "success",
        },
        type: "table",
      },
      {
        id: "Q4",
        position: { x: 1250, y: 400 },
        data: { label: "Is this a recursive save ?" },
        type: "diamond",
      },
      {
        id: "9",
        position: { x: 900, y: 440 },
        data: {
          label: "9. Executes Assignment Rules",
          variant: "success",
          data: ARdata,
        },
        type: "table",
      },
      {
        id: "10",
        position: { x: 900, y: 200 },
        data: {
          label: "10. Executes auto-response rules",
          variant: "success",
          data: AResdata,
        },
        type: "table",
      },
      {
        id: "11",
        position: { x: 600, y: 200 },
        data: {
          label: "11. Executes workflow rules",
          variant: "success",
          data: WFdata,
        },
        type: "table",
      },
      {
        id: "Q5",
        position: { x: 200, y: 165 },
        data: { label: "Are there any workflow field updates?" },
        type: "diamond",
      },
      {
        id: "11A",
        position: { x: 0, y: 600 },
        data: {
          label: "11A. If there are workflow field updates:",
          variant: "info",
          body: "Updates the record again, Runs system validations again, Custom validation rules flows duplicate rules processes and escalation rules are NOT run again, Executes before update triggers and after update triggers regardless of the record operation (insert or update) one more time (and only one more time)",
        },
        type: "block",
      },
      {
        id: "12",
        position: { x: 600, y: 440 },
        data: {
          label: "12. Executes processes",
          variant: "success",
        },
        type: "table",
      },
      {
        id: "13",
        position: { x: 625, y: 650 },
        data: {
          label: "13. Executes Flow automations in no perticular order",
          variant: "info",
          body: "Processes, Flows launched by processes, Flows launched by workflow rules",
        },
        type: "block",
      },
      {
        id: "14",
        position: { x: 900, y: 650 },
        data: {
          label: "14. Executes 'after save' record-triggered flow",
          variant: "success",
          data: AFdata,
        },
        type: "table",
      },
      {
        id: "15",
        position: { x: 900, y: 850 },
        data: {
          label: "15. Executes Entitlement Rules",
          variant: "success",
          data: EPdata,
        },
        type: "table",
      },
      {
        id: "Q6",
        position: { x: 890, y: 1050 },
        data: { label: "Does the record contain roll-up summary fields" },
        type: "diamond",
      },
      {
        id: "16",
        position: { x: 930, y: 1350 },
        data: {
          label: "16. Calculates the roll-up summary field on parent records",
          variant: "info",
        },
        type: "block",
      },
      {
        id: "17",
        position: { x: 1400, y: 1350 },
        data: {
          label:
            "17. Calculates the roll-up summary fields on grand-parent records",
          variant: "info",
          // body: "If there are workflow field updates:",
        },
        type: "block",
      },
      {
        id: "18",
        position: { x: 1650, y: 1080 },
        data: {
          label: "18. Executes Criteria Based Sharing rules",
          variant: "success",
          // body: "If there are workflow field updates:",
        },
        type: "table",
      },
      {
        id: "19",
        position: { x: 1950, y: 1080 },
        data: {
          label: "19. Commits all DML operations to the database",
          variant: "success",
          // body: "If there are workflow field updates:",
        },
        type: "block",
      },
      {
        id: "20",
        position: { x: 2250, y: 1080 },
        data: {
          label: "20. Executes Post-Commit logic",
          variant: "info",
          body: "Sending email, Executing enqueued asynchronous Apex jobs including queueable jobs and future methods, Asynchronous paths in record-triggered flows",
        },
        type: "block",
      },
    ]);

    setEdges([
      {
        id: "e1-2",
        source: "1",
        target: "2",
        type: "smoothstep",
        sourceHandle: "sright",
        targetHandle: "tleft",
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
        sourceHandle: "sright",
        targetHandle: "tleft",
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
        sourceHandle: "stop",
        targetHandle: "tleft",
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
        sourceHandle: "sright",
        targetHandle: "tleft",
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
        sourceHandle: "sbottom",
        targetHandle: "ttop",
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
        sourceHandle: "sright",
        targetHandle: "tbottom",
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
        sourceHandle: "stop",
        targetHandle: "tleft",
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
        sourceHandle: "sright",
        targetHandle: "tleft",
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
        sourceHandle: "sbottom",
        targetHandle: "ttop",
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
        sourceHandle: "sright",
        targetHandle: "tleft",
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
        sourceHandle: "sright",
        targetHandle: "tleft",
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
        sourceHandle: "sbottom",
        targetHandle: "ttop",
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
        sourceHandle: "sleft",
        targetHandle: "tright",
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
        sourceHandle: "stop",
        targetHandle: "ttop",
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
        sourceHandle: "sbottom",
        targetHandle: "tright",
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
        id: "e7-8",
        source: "7",
        target: "8",
        type: "smoothstep",
        sourceHandle: "sleft",
        targetHandle: "tright",
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
        id: "e8-Q4",
        source: "8",
        target: "Q4",
        type: "smoothstep",
        sourceHandle: "sleft",
        targetHandle: "ttop",

        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#413978",
        },
        style: {
          strokeWidth: 2,
          stroke: "#12977e",
        },
      },
      {
        id: "eQ4-9",
        source: "Q4",
        target: "9",
        type: "smoothstep",
        label: "No",
        sourceHandle: "sleft",
        targetHandle: "tright",
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
        id: "e9-10",
        source: "9",
        target: "10",
        type: "smoothstep",
        sourceHandle: "stop",
        targetHandle: "tbottom",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#413978",
        },
        style: {
          strokeWidth: 2,
          stroke: "#12977e",
        },
      },
      {
        id: "e10-11",
        source: "10",
        target: "11",
        type: "smoothstep",
        sourceHandle: "sleft",
        targetHandle: "tright",
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
        id: "e11-Q5",
        source: "11",
        target: "Q5",
        type: "smoothstep",
        sourceHandle: "sleft",
        targetHandle: "tright",
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
        id: "eQ5-11A",
        source: "Q5",
        target: "11A",
        type: "smoothstep",
        label: "Yes",
        sourceHandle: "sleft",
        targetHandle: "ttop",
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
        id: "eQ5-12",
        source: "Q5",
        target: "12",
        type: "smoothstep",
        label: "No",
        sourceHandle: "sbottom",
        targetHandle: "ttop",
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
        id: "e11A-12",
        source: "11A",
        target: "12",
        type: "smoothstep",
        sourceHandle: "sright",
        targetHandle: "tleft",
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
        id: "e12-13",
        source: "12",
        target: "13",
        type: "smoothstep",
        sourceHandle: "sbottom",
        targetHandle: "ttop",
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
        id: "e13-14",
        source: "13",
        target: "14",
        type: "smoothstep",
        sourceHandle: "sright",
        targetHandle: "tleft",
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
        id: "e14-15",
        source: "14",
        target: "15",
        type: "smoothstep",
        sourceHandle: "sbottom",
        targetHandle: "ttop",
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
        id: "e15-Q6",
        source: "15",
        target: "Q6",
        type: "smoothstep",
        sourceHandle: "sbottom",
        targetHandle: "ttop",
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
        id: "eQ6-16",
        source: "Q6",
        target: "16",
        type: "smoothstep",
        label: "Yes",
        sourceHandle: "sbottom",
        targetHandle: "ttop",
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
        id: "eQ6-18",
        source: "Q6",
        target: "18",
        type: "smoothstep",
        label: "No",
        sourceHandle: "sright",
        targetHandle: "tleft",
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
        id: "e16-17",
        source: "16",
        target: "17",
        type: "smoothstep",
        sourceHandle: "sright",
        targetHandle: "tleft",
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
        id: "e17-18",
        source: "17",
        target: "18",
        type: "smoothstep",
        sourceHandle: "stop",
        targetHandle: "tbottom",
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
        id: "e18-19",
        source: "18",
        target: "19",
        type: "smoothstep",
        sourceHandle: "sright",
        targetHandle: "tleft",
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
        id: "eq4-18",
        source: "Q4",
        target: "18",
        type: "smoothstep",
        label: "Yes",
        sourceHandle: "sbottom",
        targetHandle: "ttop",
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
        id: "e19-20",
        source: "19",
        target: "20",
        type: "smoothstep",
        sourceHandle: "sright",
        targetHandle: "tleft",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#ca2936",
        },
        style: {
          strokeWidth: 2,
          stroke: "#ca2936",
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

    // After Trigger
    const ATdata = automationData.data.afterTrigger.records.map((record) => {
      return record.Name;
    });
    setATdata(() => {
      return ATdata;
    });

    // Execute Assignment Rule
    const ARdata = automationData.data.assignmentRule.records.map((record) => {
      return record.Name;
    });
    setARdata(() => {
      return ARdata;
    });

    // Execute Auto Response Rule
    const AResdata = automationData.data.autoResponseRule.records.map(
      (record) => {
        return record.Name;
      }
    );

    setAResdata(() => {
      return AResdata;
    });

    console.log("All Automation---------->", automationData.data);

    // Execute Workflow Rule
    const WFdata = automationData.data.workflowRules.records.map((record) => {
      return record.Name;
    });

    setWFdata(() => {
      return WFdata;
    });

    // Execute After Save Trigger
    const AFdata = automationData.data.afterFlow.records.map((record) => {
      return record.ApiName;
    });

    setAFdata(() => {
      return AFdata;
    });

    // Execute Entitlement Process
    const EPdata = automationData.data.entitlementProcess.records.map(
      (record) => {
        return record.Name;
      }
    );

    setEPdata(() => {
      return EPdata;
    });
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Box width={400}>
        {/* This is used to select the object and get the object from the child object */}
        <ObjectSelector OnObjectSelection={handleObjectSelection} />
      </Box>
      <ReactFlow
        // nodesDraggable={true}
        fitView="true"
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
