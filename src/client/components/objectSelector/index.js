import React, { Component } from "react";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import APIService from "../../service/APIService.js";

const theme = createTheme();

const styles = {
  formControl: {
    color: "black",
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
    borderRadius: 2,
    width: "80%",
    marginLeft: "10%",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    padding: "8px 14px",
  },
};

class ObjectSelector extends Component {
  state = {
    selectedObject: "",
    objects: [],
    isLoading: false,
    isObjectsLoaded: false,
  };

  handleClick = async () => {
    // Only fetch objects if they haven't been loaded yet
    if (!this.state.isObjectsLoaded && !this.state.isLoading) {
      this.setState({ isLoading: true });
      try {
        const response = await APIService.getObjects();
        this.setState({
          objects: response.data,
          isLoading: false,
          isObjectsLoaded: true,
        });
      } catch (error) {
        console.error("Failed to fetch objects:", error);
        this.setState({ isLoading: false });
      }
    }
  };

  handleSelect = (event) => {
    const selected = event.target.value;
    this.setState({ selectedObject: selected });
    this.props.OnObjectSelection(selected);
  };

  render() {
    const { selectedObject, objects, isLoading } = this.state;

    return (
      <FormControl fullWidth sx={styles.formControl}>
        <InputLabel id="object-selector-label" sx={{ color: "Black" }}>
          Object
        </InputLabel>
        <Select
          labelId="object-selector-label"
          id="object-selector"
          value={selectedObject}
          label="Object"
          onChange={this.handleSelect}
          onOpen={this.handleClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <MenuItem disabled>
              <div style={styles.loadingContainer}>
                <CircularProgress size={20} />
                <span style={{ marginLeft: 10 }}>Loading objects...</span>
              </div>
            </MenuItem>
          ) : (
            objects?.map((object) => (
              <MenuItem value={object.name} key={object.name}>
                {object.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    );
  }
}

export default ObjectSelector;
