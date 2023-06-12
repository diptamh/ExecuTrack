import React, { memo } from "react";

import { Handle, Position } from "reactflow";
import { Card, CardContent, Typography, Box } from "@mui/material";
import "./style.css";

const Node = ({ data, selected }) => {
  function getVariant(variant = "info") {
    if (selected) {
      return "outlined";
    }
    return "elevation";
  }

  return (
    <div>
      <Box
        sx={{
          minHeight: 150,
          boxShadow: 4,
          borderRadius: 3,
          padding: 1,
        }}
        className={data.variant || "info"}
      >
        <Typography
          sx={{
            fontSize: 12,

            padding: 1,
            fontWeight: "bold",
          }}
          color="text.secondary"
          gutterBottom
        >
          {data.label}
        </Typography>
      </Box>
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <Handle type="target" position={Position.Top} id="top" />
    </div>
  );
};

export default memo(Node);
