import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import M from "materialize-css/dist/js/materialize.min.js";
import spinner from "../loading.gif";

class Search extends Component {
  state = {
    loading: false,
    searchWord: "",
    searchResult: []
  };
  componentDidMount() {
    M.AutoInit();
  }

  formatTime = time => {
    let formatedTime = time;
    formatedTime =
      formatedTime.substr(0, 10) + " | " + formatedTime.substr(11).slice(0, -4);
    return formatedTime;
  };
  formatText = text => {
    if (text) {
      return text.slice(0, -13);
    }
  };

  search = () => {
    this.setState({
      loading: true
    });
    axios
      .get(`https://newsapi.org/v2/everything?q=${this.state.searchWord}&apiKey=${process.env.REACT_APP_NEWSAPI}`)
      .then(result =>
        this.setState({
          searchResult: result.data.articles,
          loading: false
        })
      )
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="container" style={{ paddingBottom: "25px" }}>
        <Link
          to="/"
          className="waves-effect waves-light"
          style={{ padding: "15px" }}
        >
          <i className="material-icons left">arrow_left</i>
          Go Back
        </Link>
        <div className="row">
          <div className="col s12 m6 offset-m3 white-text center-align">
            <h5>Search Topheadlines News</h5>
            <div className="input-field">
              <input
                id="search"
                type="text"
                className="validate"
                value={this.state.searchWord}
                onChange={event =>
                  this.setState({ searchWord: event.target.value })
                }
              />
              <label htmlFor="search">Search news here...</label>
            </div>
            <button
              className="waves-effect waves-light btn"
              onClick={this.search}
            >
              <i className="material-icons right">search</i>Search
            </button>
            <button
              className="waves-effect waves-light btn"
              style={{ marginLeft: "15px" }}
              onClick={() => this.setState({ searchWord: "" })}
            >
              <i className="material-icons right">clear</i>Reset
            </button>
          </div>
          <div className="col s12 m10 offset-m1">
            {this.state.loading ? (
              <div className="loader">
                <div className="white-text" style={{ padding: "50px" }}>
                  <img src={spinner} alt="spinner" />
                  <p>Loading news...</p>
                </div>
              </div>
            ) : (
              <div>
                {this.state.searchResult.map(news => (
                  <div
                    className="card-panel grey lighten-2 z-depth-1 m8"
                    key={news.title}
                  >
                    <div className="row">
                      <div className="col s12 m4">
                        <img
                          src={news.urlToImage}
                          alt="news"
                          width="256"
                          height="256"
                          className="responsive-img materialboxed"
                        />
                      </div>
                      <div className="col s12 m8">
                        <h5>
                          <strong>{news.title}</strong>
                        </h5>
                        <blockquote>{news.description}</blockquote>
                        <span>
                          {this.formatText(news.content)}
                          <br />
                          <a
                            href={news.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Fullpost
                          </a>
                        </span>
                        <div className="right" style={{ padding: "8px" }}>
                          <strong>{this.formatTime(news.publishedAt)}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
