import React, { Component } from "react";
import { Icon, SideNav, SideNavItem } from "react-materialize";
import "./App.css";
import Movie from "./Movie";
import SearchForm from "./SearchForm";

import axios from "../axios";

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchResults: [],
      totalResults: 0,
      filters: []
    };

    this.API_KEY = "b5a99a1443a24e1533031d476b782574";

    this.search = this.search.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.genreFilter = this.genreFilter.bind(this);
  }

  search(query) {
    axios
      .get("/search/movie", {
        params: {
          api_key: this.API_KEY,
          query
        }
      })
      .then(data => {
        this.setState({
          searchResults: data.data.results,
          totalResults: data.data.total_results,
          filters: this.state.filters
        });
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const genre_id = target.name;

    let newFilters = this.state.filters;
    if (value) {
      newFilters.push(parseInt(genre_id, 10));
    } else if (newFilters.length === 1) {
      newFilters = [];
    } else {
      const idx = newFilters.indexOf(genre_id);
      newFilters.splice(idx + 1, 1);
    }

    this.setState({
      filters: newFilters
    });
  }

  genreFilter(genre_id) {
    return this.state.filters.indexOf(genre_id) !== -1;
  }

  render() {
    let movies;

    if (this.state.searchResults.length > 0) {
      movies = this.state.searchResults.map(result => {
        return (
          <Movie
            key={result.id}
            poster_path={result.poster_path}
            title={result.title}
            vote_average={result.vote_average}
            genre_ids={result.genre_ids}
            overview={result.overview}
            release_date={result.release_date}
            hidden={
              this.state.filters.length > 0 &&
              !result.genre_ids.some(this.genreFilter)
            }
          />
        );
      });
    } else {
      movies = <p className="App-empty">Enter a search in the search box!</p>;
    }

    return (
      <div className="App">
        <SideNav fixed>
          <SideNavItem>
            <h3>Wesley</h3>
          </SideNavItem>
          <SideNavItem className="active">
            <Icon right>search</Icon>
            <p>Discover</p>
          </SideNavItem>
        </SideNav>
        <div className="App-Movies">
          {this.state.totalResults > 0 && (
            <p>{this.state.totalResults} movies</p>
          )}
          <main>{movies}</main>
        </div>
        <aside>
          <SearchForm
            search={this.search}
            handleInputChange={this.handleInputChange}
          />
        </aside>
      </div>
    );
  }
}

export default App;
