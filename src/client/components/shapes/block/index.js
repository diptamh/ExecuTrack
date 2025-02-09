import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { Typography, Box } from "@mui/material";
import "./style.css";

const Node = ({ data, selected }) => {
  const body = data.body?.split(",");

  return (
    <div>
      <Box
        sx={{
          maxWidth: 200,
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
        {body?.map((item, index) => (
          <Typography
            key={index}
            variant="caption"
            display="block"
            gutterBottom
          >
            * {item}
            <br />
          </Typography>
        ))}
      </Box>
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
