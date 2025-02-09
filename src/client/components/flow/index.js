import React, { useEffect, useState, useCallback } from "react";
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  useReactFlow,
} from "reactflow";
import {
  Box,
  CircularProgress,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import { ZoomIn, ZoomOut, CenterFocusStrong } from "@mui/icons-material";
import Block from "../shapes/block";
import Diamond from "../shapes/diamond";
import Table from "../table/index.js";
import ObjectSelector from "../objectSelector/index.js";
import APIService from "../../service/APIService.js";
import "reactflow/dist/style.css";
// Import only the icons that are used
import { GrValidate, GrTrigger } from "react-icons/gr";
import { IoDuplicateOutline } from "react-icons/io5";
import { MdOutlineAutoMode, MdPriorityHigh, MdAcUnit } from "react-icons/md";
import { TfiRulerPencil } from "react-icons/tfi";
import { FcWorkflow } from "react-icons/fc";
import { TiFlowMerge } from "react-icons/ti";
import { CiShare2 } from "react-icons/ci";

const proOptions = { hideAttribution: true };

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
  const [ESdata, setESdata] = useState([null]);
  const [SRdata, setSRdata] = useState([null]);
  const [loading, setLoading] = useState(false); // Add loading state

  // Remove redundant setNodeTypes call in useEffect
  const nodeTypes = {
    block: Block,
    diamond: Diamond,
    table: Table,
  };

  useEffect(() => {
    setNodes([
      {
        id: "2D",
        position: { x: 0, y: 0 },
        data: {
          icon: <GrValidate />,
          data: VRdata,
          label: "Run Custom Validation Rules",
          variant: "success",
        },
        type: "table",
      },
      {
        id: "3",
        position: { x: 400, y: 0 },
        data: {
          icon: <TiFlowMerge />,
          data: BFdata,
          label: "Executes BEFORE Record-Triggered FLOW",
          variant: "success",
        },
        type: "table",
      },
      {
        id: "4",
        position: { x: 800, y: 0 },
        data: {
          icon: <GrTrigger />,
          data: BTdata,
          label: "Executes BEFORE APEX Triggers",
          variant: "success",
        },
        type: "table",
      },
      {
        id: "6",
        position: { x: 1200, y: 0 },
        data: {
          icon: <IoDuplicateOutline />,
          data: DRdata,
          label: "Executes duplicate rules",
          variant: "success",
        },
        type: "table",
      },
      {
        id: "8",
        position: { x: 1600, y: 0 },
        data: {
          icon: <GrTrigger />,
          label: "Executes AFTER APEX Triggers",
          data: ATdata,
          variant: "success",
        },
        type: "table",
      },
      {
        id: "9",
        position: { x: 2000, y: 0 },
        data: {
          icon: <TfiRulerPencil />,
          label: "Executes Assignment Rules",
          variant: "success",
          data: ARdata,
        },
        type: "table",
      },
      {
        id: "10",
        position: { x: 2000, y: 400 },
        data: {
          icon: <MdOutlineAutoMode />,
          label: "Executes auto-response rules",
          variant: "success",
          data: AResdata,
        },
        type: "table",
      },
      {
        id: "11",
        position: { x: 1600, y: 400 },
        data: {
          icon: <FcWorkflow />,
          label: "Executes workflow rules",
          variant: "success",
          data: WFdata,
        },
        type: "table",
      },
      {
        id: "12",
        position: { x: 1200, y: 400 },
        data: {
          icon: <MdPriorityHigh />,
          label: "Executes Escalation Rules",
          variant: "success",
          data: ESdata,
        },
        type: "table",
      },

      {
        id: "14",
        position: { x: 800, y: 400 },
        data: {
          icon: <TiFlowMerge />,
          label: "Executes AFTER Record-Triggered FLOW",
          variant: "success",
          data: AFdata,
        },
        type: "table",
      },
      {
        id: "15",
        position: { x: 400, y: 400 },
        data: {
          icon: <MdAcUnit />,
          label: "Executes Entitlement Rules",
          variant: "success",
          data: EPdata,
        },
        type: "table",
      },

      {
        id: "18",
        position: { x: 0, y: 400 },
        data: {
          icon: <CiShare2 />,
          label: "Executes Criteria Based Sharing rules",
          variant: "success",
          data: SRdata,
        },
        type: "table",
      },
    ]);

    setEdges([
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
        id: "e9-10",
        source: "9",
        target: "10",
        type: "smoothstep",
        sourceHandle: "sbottom",
        targetHandle: "ttop",
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
    try {
      setLoading(true);
      const automationData = await APIService.getAllAutomation(selected);
      const sessionData = await APIService.getSessionData();
      const instance_url =
        sessionData._raw.urls.rest.split("/services/data")[0];

      // Validation Rule
      const VRdata = automationData.data.validation.records.map((record) => {
        return {
          Id: instance_url + "/" + record.Id,
          data: record.ValidationName,
          active: record.Active,
        };
      });
      setVRdata(() => {
        return VRdata;
      });

      // Before Trigger
      const BTdata = automationData.data.beforeTrigger.records.map((record) => {
        return {
          Id: instance_url + "/" + record.Id,
          data: record.Name,
          active: record.Status === "InActive" ? false : true,
        };
      });
      setBTdata(() => {
        return BTdata;
      });

      // Before Flow
      const BFdata = automationData.data.beforeFlow.records.map((record) => {
        return {
          Id: instance_url + "/" + record.Id,
          data: record.ApiName,
          active: record.IsActive,
        };
      });

      setBFdata(() => {
        return BFdata;
      });

      // Duplicate Rule
      const DRdata = automationData.data.duplicateRule.records.map((record) => {
        return {
          Id: instance_url + "/" + record.Id,
          data: record.DeveloperName,
          active: record.IsActive,
        };
      });
      setDRdata(() => {
        return DRdata;
      });

      // After Trigger
      const ATdata = automationData.data.afterTrigger.records.map((record) => {
        return {
          Id: instance_url + "/" + record.Id,
          data: record.Name,
          active: record.Status === "InActive" ? false : true,
        };
      });
      setATdata(() => {
        return ATdata;
      });

      // Execute Assignment Rule
      const ARdata = automationData.data.assignmentRule.records.map(
        (record) => {
          return {
            Id: instance_url + "/" + record.Id,
            data: record.Name,
            active: record.Active,
          };
        }
      );
      setARdata(() => {
        return ARdata;
      });

      // Execute Auto Response Rule
      const AResdata = automationData.data.autoResponseRule.records.map(
        (record) => {
          return {
            Id: instance_url + "/" + record.Id,
            data: record.Name,
            active: record.Active,
          };
        }
      );

      setAResdata(() => {
        return AResdata;
      });

      // Execute Workflow Rule
      const WFdata = automationData.data.workflowRules.records.map((record) => {
        return {
          Id: instance_url + "/" + record.Id,
          data: record.Name,
          active: null,
        };
      });

      setWFdata(() => {
        return WFdata;
      });

      // Execute After Save Trigger
      const AFdata = automationData.data.afterFlow.records.map((record) => {
        return {
          Id: instance_url + "/" + record.Id,
          data: record.ApiName,
          active: record.IsActive,
        };
      });

      setAFdata(() => {
        return AFdata;
      });

      // Execute Entitlement Process
      const EPdata = automationData.data.entitlementProcess.map((record) => {
        return { Id: record, data: record, active: null };
      });

      setEPdata(() => {
        return EPdata;
      });

      // Execute Escalation Rule
      const ESdata = automationData.data.escalationRules.map((record) => {
        return { Id: record, data: record, active: null };
      });

      setESdata(() => {
        return ESdata;
      });

      // Execute Sharing Rule
      const SRdata = automationData.data.sharingRules.map((record) => {
        return { Id: record, data: record, active: null };
      });

      setSRdata(() => {
        return SRdata;
      });
    } catch (error) {
      console.error("Error fetching automation data:", error);
    } finally {
      setLoading(false); // Set loading to false when data fetching is complete (success or error)
    }
  };

  // Get ReactFlow instance methods
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  // Zoom handlers
  const handleZoomIn = () => {
    zoomIn();
  };

  const handleZoomOut = () => {
    zoomOut();
  };

  const handleCenterView = useCallback(() => {
    fitView({ duration: 800, padding: 0.1 });
  }, [fitView]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#f5f5f5",
        pt: 0,
      }}
    >
      {/* Loading overlay */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(255, 255, 255, 0.8)", // Lighter overlay
            backdropFilter: "blur(4px)", // Blur effect
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <CircularProgress color="primary" />
            <span>Loading automation data...</span>
          </Paper>
        </Box>
      )}

      {/* Object Selector - Adjusted position */}
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          top: 4, // Reduced from 8 to 4
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          width: "min(400px, 90%)",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <ObjectSelector OnObjectSelection={handleObjectSelection} />
      </Paper>

      {/* Controls - Updated with handlers */}
      <Paper
        elevation={2}
        sx={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          p: 0.5,
          gap: 0.5,
          bgcolor: "background.paper",
        }}
      >
        <Tooltip title="Zoom In" placement="left">
          <IconButton size="small" onClick={handleZoomIn}>
            <ZoomIn />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom Out" placement="left">
          <IconButton size="small" onClick={handleZoomOut}>
            <ZoomOut />
          </IconButton>
        </Tooltip>
        <Tooltip title="Center View" placement="left">
          <IconButton size="small" onClick={handleCenterView}>
            <CenterFocusStrong />
          </IconButton>
        </Tooltip>
      </Paper>

      {/* Flow Canvas - Adjusted padding */}
      <Box
        sx={{
          height: "100%",
          pt: "48px", // Reduced from 64px to 48px
          ".react-flow__node": {
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: 3,
            },
          },
          ".react-flow__edge": {
            transition: "stroke-width 0.2s",
            "&:hover": {
              strokeWidth: 3,
            },
          },
        }}
      >
        <ReactFlow
          fitView
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          defaultViewport={{ zoom: 1 }}
          minZoom={0.2}
          maxZoom={4}
        >
          <Background
            variant="dots"
            gap={16}
            size={1}
            color="#91919a"
            style={{ opacity: 0.4 }}
          />
        </ReactFlow>
      </Box>
    </Box>
  );
}
