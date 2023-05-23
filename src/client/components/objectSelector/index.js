import React, { Component } from "react";
import {
  Dialog,
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SiSalesforce } from "react-icons/si";
import axios from "axios";

const theme = createTheme();

class ObjectSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedObject: "",
    };
  }

  handleSelect = (event) => {
    const selected = event.target.value;
    this.setState({ selectedObject: selected });

    // this is used to pass the selected object to the parent component
    this.props.OnObjectSelection(selected);
  };

  componentDidMount() {
    axios.get("/api/v1/salesforce/objects").then((response) => {
      console.log("objects->", response.data);
      this.setState({ objects: response.data });
    });
  }

  render() {
    return (
      <FormControl fullWidth size="small">
        <InputLabel id="object-selector-label">Object</InputLabel>
        <Select
          labelId="object-selector-label"
          id="object-selector"
          value={this.state.selectedObject}
          label="Object"
          onChange={this.handleSelect}
        >
          {this.state.objects?.map((object) => (
            <MenuItem value={object.name} key={object.name}>
              {object.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export default ObjectSelector;
