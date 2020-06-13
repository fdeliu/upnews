import React, { Component } from "react";
import spinner from "../loading.gif";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";

class Main extends Component {
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
  render() {
    const category =
      this.props.category.charAt(0).toUpperCase() +
      this.props.category.slice(1);
    return (
      <div style={{ paddingBottom: "3%", width:"100%" }}>
        <h4 className="white-text">
          Top Headlines |<span> {category}</span>
        </h4>
        {this.props.loading ? (
          <div className="loader">
            <div className="white-text" style={{ padding: "50px" }}>
              <img src={spinner} alt="spinner" />
              <p>Loading news...</p>
            </div>
          </div>
        ) : (
          <div>
            {this.props.news.map(news => (
              <div
                className="card-panel col s12 grey lighten-2 z-depth-1"
                key={news.title}
              >
                <div className="row">
                  <div className="col m4">
                    <img
                      style={{paddingTop:'15px', width:'100%'}}
                      src={news.urlToImage}
                      alt="news"
                      height="256"
                      className="responsive-img materialboxed"
                    />
                  </div>
                  <div className="col m8">
                    <h5>
                      <strong>{news.title}</strong>
                    </h5>
                    <blockquote>{news.description}</blockquote>
                    <span>
                      {this.formatText(news.content)}
                      {"  "}
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
            <em className="white-text">
              Want to see more? Click{" "}
              <Link to="/search">
                {" "}
                <strong>here</strong>{" "}
              </Link>{" "}
              to search for a specific news.
            </em>
          </div>
        )}
      </div>
    );
  }
}

export default Main;
