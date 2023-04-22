import React, { memo } from "react";

import { Handle, Position } from "reactflow";
import { Typography } from "@mui/material";
import "./style.css";

const Node = ({ data, selected }) => {
  return (
    <div className="diamond">
      <div style={{ lineHeight: 1, paddingTop: "40%" }}>
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
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="target" position={Position.Left} id="a" />
      <Handle type="source" position={Position.Bottom} id="c" />
    </div>
  );
};

export default memo(Node);
