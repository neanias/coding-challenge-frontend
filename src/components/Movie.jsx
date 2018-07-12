import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-materialize';

import './Movie.css';

import genre_ids from '../util/genre_ids';

class Movie extends Component {
  POSTER_WIDTH = 300;
  POSTER_HEIGHT = 450;

  posterLink(posterPath) {
    return `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${posterPath}`;
  }

  render() {
    return (
      <div className="Movie">
        <div className="Movie-poster">
          <img src={this.posterLink(this.props.poster_path)} alt={this.props.title} />
        </div>
        <div className="Movie-content">
          <h3>
            {this.props.title}
            <Badge className="Movie-rating">{this.props.vote_average}</Badge>
          </h3>
          <p className="Movie-genres">{genre_ids(this.props.genre_ids)}</p>
          <p>{this.props.overview}</p>
          <p className="Movie-release_date">{this.props.release_date}</p>
        </div>
      </div>
    );
  }
}

Movie.propTypes = {
  poster_path: PropTypes.string,
  title: PropTypes.string,
  vote_average: PropTypes.number,
  genre_ids: PropTypes.array,
  overview: PropTypes.string,
  release_date: PropTypes.string,
}

export default Movie;
