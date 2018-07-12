import React, { Component } from 'react';
import { Icon, SideNav, SideNavItem } from 'react-materialize';
import './App.css';
import Movie from './Movie';
import SearchForm from './SearchForm';

import axios from '../axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchResults: [],
      totalResults: 0,
    }

    this.API_KEY = "b5a99a1443a24e1533031d476b782574";

    this.search = this.search.bind(this);
  }

  search(query) {
    axios.get('/search/movie', {
      params: {
        api_key: this.API_KEY,
        query
      }
    }).then(data => {
      this.setState({
        searchResults: data.data.results,
        totalResults: data.data.total_results
      });
    });
  }

  posterLink(posterPath) {
    return `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${posterPath}`;
  }

  render() {
    let movies;

    if (this.state.searchResults.length > 0) {
      movies = this.state.searchResults.map(result => {
        return (<Movie
          key={result.id}
          poster_link={this.posterLink(result.poster_path)}
          title={result.title}
          vote_average={result.vote_average}
          genre_ids={result.genre_ids}
          overview={result.overview}
          release_date={result.release_date}
        />);
      })
    } else {
      movies = <p className="App-empty">Enter a search in the search box!</p>
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
          { this.state.totalResults > 0 &&
            <p>{this.state.totalResults} movies</p>}
          <main>
            {movies}
          </main>
        </div>
        <aside>
          <SearchForm search={this.search} />
        </aside>
      </div>
    );
  }
}

export default App;
