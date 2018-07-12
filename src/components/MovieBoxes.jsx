import React, { Component } from "react";
import { Input } from "react-materialize";
import PropTypes from "prop-types";

import { genres } from "../util/genre_ids";

class MovieBoxes extends Component {
  render() {
    let inputs = genres.map(({ id, name }) => {
      return (
        <Input
          key={id}
          name={id.toString()}
          type="checkbox"
          label={name}
          className="filled-in"
          onChange={this.props.handleInputChange}
        />
      );
    });

    return <div>{inputs}</div>;
  }
}

MovieBoxes.propTypes = {
  handleInputChange: PropTypes.func
};

export default MovieBoxes;
