import React, { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
const proOptions = { hideAttribution: true };
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
        id: "2B",
        position: { x: 0, y: 0 },
        data: {
          label: "2B. Salesforce validates only the foreign keys",
          variant: "info",
        },
        type: "table",
      },
      {
        id: "2D",
        position: { x: 400, y: 0 },
        data: {
          data: VRdata,
          label: "2D. Run custom validation rules",
          variant: "success",
        },
        type: "table",
      },
      {
        id: "3",
        position: { x: 800, y: 0 },
        data: {
          data: BFdata,
          label: "3. Executes 'before Save' record-triggered flow",
          variant: "success",
        },
        type: "table",
      },
      {
        id: "4",
        position: { x: 1200, y: 0 },
        data: {
          data: BTdata,
          label: "4. Executes all before triggers",
          variant: "success",
        },
        type: "table",
      },
      {
        id: "6",
        position: { x: 1600, y: 0 },
        data: {
          data: DRdata,
          label: "6. Executes duplicate rules",
          variant: "success",
        },
        type: "table",
      },
      {
        id: "8",
        position: { x: 2000, y: 0 },
        data: {
          label: "8. Executes all after triggers",
          data: ATdata,
          variant: "success",
        },
        type: "table",
      },
      {
        id: "9",
        position: { x: 2400, y: 200 },
        data: {
          label: "9. Executes Assignment Rules",
          variant: "success",
          data: ARdata,
        },
        type: "table",
      },
      {
        id: "10",
        position: { x: 2000, y: 400 },
        data: {
          label: "10. Executes auto-response rules",
          variant: "success",
          data: AResdata,
        },
        type: "table",
      },
      {
        id: "11",
        position: { x: 1600, y: 400 },
        data: {
          label: "11. Executes workflow rules",
          variant: "success",
          data: WFdata,
        },
        type: "table",
      },
      {
        id: "12",
        position: { x: 1200, y: 400 },
        data: {
          label: "12. Executes Escalation Rules",
          variant: "success",
        },
        type: "table",
      },

      {
        id: "14",
        position: { x: 800, y: 400 },
        data: {
          label: "14. Executes 'after save' record-triggered flow",
          variant: "success",
          data: AFdata,
        },
        type: "table",
      },
      {
        id: "15",
        position: { x: 400, y: 400 },
        data: {
          label: "15. Executes Entitlement Rules",
          variant: "success",
          data: EPdata,
        },
        type: "table",
      },

      {
        id: "18",
        position: { x: 0, y: 400 },
        data: {
          label: "18. Executes Criteria Based Sharing rules",
          variant: "success",
          // body: "If there are workflow field updates:",
        },
        type: "table",
      },
    ]);

    setEdges([
      {
        id: "2b-2d",
        source: "2B",
        target: "2D",
        type: "smoothstep",
        sourceHandle: "sright",
        targetHandle: "tleft",
        animated: true,
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
        id: "2d-3",
        source: "2D",
        target: "3",
        type: "smoothstep",
        sourceHandle: "sright",
        targetHandle: "tleft",
        animated: true,
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
        animated: true,
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
        id: "e4-6",
        source: "4",
        target: "6",
        type: "smoothstep",
        sourceHandle: "sright",
        targetHandle: "tleft",
        animated: true,
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
        id: "e6-8",
        source: "6",
        target: "8",
        type: "smoothstep",
        sourceHandle: "sright",
        targetHandle: "tleft",
        animated: true,
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
        id: "e8-Q9",
        source: "8",
        target: "9",
        type: "smoothstep",
        sourceHandle: "sright",
        targetHandle: "ttop",
        animated: true,
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
        id: "e9-10",
        source: "9",
        target: "10",
        type: "smoothstep",
        sourceHandle: "sbottom",
        targetHandle: "tright",
        animated: true,
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
        animated: true,
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
        id: "e11-12",
        source: "11",
        target: "12",
        type: "smoothstep",
        sourceHandle: "sleft",
        targetHandle: "tright",
        animated: true,
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
        id: "e12-14",
        source: "12",
        target: "14",
        type: "smoothstep",
        sourceHandle: "sleft",
        targetHandle: "tright",
        animated: true,
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
        sourceHandle: "sleft",
        targetHandle: "tright",
        animated: true,
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
        id: "e15-18",
        source: "15",
        target: "18",
        type: "smoothstep",
        sourceHandle: "sleft",
        targetHandle: "tright",
        animated: true,
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
    <div style={{ width: "100vw", height: "88vh", background: "#1a192b" }}>
      <Box width={400}>
        {/* This is used to select the object and get the object from the child object */}
        <ObjectSelector OnObjectSelection={handleObjectSelection} />
      </Box>
      <ReactFlow
        fitView="true"
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
      >
        <Background variant="dots" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
