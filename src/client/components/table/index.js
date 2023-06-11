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
} from "@mui/material";
const handleStyle = { left: 10 };

const Node = ({ data, selected }) => {
  const rows = [];
  for (const dataKey in data.data) {
    rows.push(data.data[dataKey]);
  }
  const isConnectable = true;

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
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
              {rows.map((row) => (
                <TableRow
                  key={row}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row}
                  </TableCell>
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
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="b"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="c"
        isConnectable={isConnectable}
      />
    </div>
  );
};

// class TextUpdaterNode extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log("props->", props.data);
//     this.rows = [];
//     this.isConnectable = true;
//     this.updateData(props.data.data);
//   }

//   updateData = (data) => {
//     for (const dataKey in data) {
//       this.rows.push(this.createData(data[dataKey]));
//     }
//   };

//   createData(name) {
//     return { name };
//   }

//   render() {
//     return (

//     );
//   }
// }

export default memo(Node);
