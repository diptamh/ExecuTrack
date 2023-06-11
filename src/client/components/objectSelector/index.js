import React, { Component } from "react";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import APIService from "../../service/APIService.js";
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
    // this is used to get the objects from the salesforce
    APIService.getObjects().then((response) => {
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
