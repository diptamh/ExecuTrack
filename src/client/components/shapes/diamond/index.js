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
      <Handle type="source" position={Position.Right} id="sright" />
      <Handle type="target" position={Position.Right} id="tright" />
      <Handle type="target" position={Position.Left} id="tleft" />
      <Handle type="source" position={Position.Left} id="sleft" />
      <Handle type="source" position={Position.Bottom} id="sbottom" />
      <Handle type="target" position={Position.Bottom} id="tbottom" />
      <Handle type="target" position={Position.Top} id="ttop" />
      <Handle type="source" position={Position.Top} id="stop" />
    </div>
  );
};

export default memo(Node);
