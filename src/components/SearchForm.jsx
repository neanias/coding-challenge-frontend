import React, { Component } from "react";
import { Button, Icon } from "react-materialize";
import PropTypes from "prop-types";

import "./SearchForm.css";

import MovieBoxes from "./MovieBoxes";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.props.search(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form className="SearchForm-form" onSubmit={this.handleSubmit}>
        <div className="input-field inline">
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="e.g. Back to the Future"
            required
          />
        </div>
        <Button waves="light" type="submit">
          <Icon>search</Icon>
        </Button>
        <MovieBoxes handleInputChange={this.props.handleInputChange} />
      </form>
    );
  }
}

SearchForm.propTypes = {
  search: PropTypes.func,
  handleInputChange: PropTypes.func
};

export default SearchForm;
