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
import { SiSalesforce } from "react-icons/si";
const Node = ({ data, selected }) => {
  // console.log("dataAll->", data);
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
            borderColor: "#ff0072",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
          }}
          className={data.variant || "info"}
        >
          <Typography
            sx={{
              fontSize: 16,
              padding: 1,
              fontWeight: "bold",
            }}
            color="Black"
            gutterBottom
          >
            {data.icon && (
              <span style={{ marginRight: "5px" }}>{data.icon}</span>
            )}
            {data.label}
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                {rows && rows.length > 0 ? (
                  rows.map((row) => (
                    <TableRow
                      key={row}
                      className="success"
                      sx={{
                        color: "black",
                        fontSize: 16,
                        borderColor: (theme) =>
                          theme.palette.mode === "light"
                            ? theme.palette.grey[200]
                            : theme.palette.grey[700],
                        backgroundColor: (theme) =>
                          theme.palette.mode === "light"
                            ? theme.palette.grey[200]
                            : theme.palette.grey[700],
                      }}
                    >
                      {row}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={0}>No data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
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
