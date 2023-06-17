import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const Node = ({ data, selected }) => {
  console.log("dataAll->", data);
  const rows = [];
  for (const dataKey in data.data) {
    rows.push(data.data[dataKey]);
  }
  const isConnectable = true;

  return (
    <div className="text-updater-node">
      <div>
        <Box
          sx={{
            maxWidth: 300,
            minWidth: 250,
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

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row} className="success">
                    {row}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <Handle type="target" position={Position.Top} id="top" />
    </div>
  );
};

export default memo(Node);
