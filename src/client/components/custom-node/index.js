import React, { memo } from "react";

import { Handle, Position } from "reactflow";
import { style } from "./style";
import { Card, CardContent, Typography } from "@mui/material";

const Node = ({ data, selected }) => {
  let customTitle = { ...style.title };
  customTitle.backgroundColor = "#08c9bd";

  return (
    <div className="text-updater-node">
      <Card sx={{ minHeight: 150 }}>
        <Typography
          sx={{
            fontSize: 10,
            borderBottom: "1px solid #eaeaea",
            padding: 1,
            fontWeight: "bold",
          }}
          color="text.secondary"
          gutterBottom
        >
          {data.label}
        </Typography>
        <CardContent></CardContent>
      </Card>
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="target" position={Position.Left} id="a" />
    </div>
  );
};

export default memo(Node);
