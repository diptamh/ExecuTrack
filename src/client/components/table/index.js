import React, { useCallback } from "react";
import { Handle, Position } from "reactflow";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
const handleStyle = { left: 10 };

class TextUpdaterNode extends React.Component {
  constructor(props) {
    super(props);
    console.log("props->", props.data);
    this.rows = [];
    this.isConnectable = true;
    this.updateData(props.data.data);
  }

  updateData = (data) => {
    for (const dataKey in data) {
      this.rows.push(this.createData(data[dataKey]));
    }
  };

  createData(name) {
    return { name };
  }

  render() {
    return (
      <div className="text-updater-node">
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={this.isConnectable}
        />
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          id="a"
          style={handleStyle}
          isConnectable={this.isConnectable}
        />
        <Handle
          type="source"
          position={Position.Left}
          id="b"
          isConnectable={this.isConnectable}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="c"
          isConnectable={this.isConnectable}
        />
      </div>
    );
  }
}

export default TextUpdaterNode;
