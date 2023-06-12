import React, { memo } from "react";

import { Handle, Position } from "reactflow";
import { Typography } from "@mui/material";
import "./style.css";

const Node = ({ data, selected }) => {
  return (
    <div className="diamond">
      <div style={{ lineHeight: 1, paddingTop: "35%" }}>
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
      </div>
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="target" position={Position.Bottom} id="bottom" />
      <Handle type="source" position={Position.Top} id="top" />
    </div>
  );
};

export default memo(Node);
