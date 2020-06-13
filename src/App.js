import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";

import NavBar from "./components/NavBar";
import Main from "./components/Main";
import MyClock from "./components/MyClock";
import Footer from "./components/Footer";
import Search from "./components/Search";

class App extends Component {
  state = {
    category: "entertainment",
    country: "us",
    news: [],
    loading: false,
    displayUpButton: false,
    scrollPosition: 0
  };
  componentDidMount() {
    M.AutoInit();
    window.addEventListener("scroll", this.handleScroll, true);
    this.getTopHeadlines();
  }
  updateCategory = cat => {
    this.setState(
      {
        category: cat
      },
      () => this.getTopHeadlines()
    );
  };

  updateCountry = code => {
    this.setState(
      {
        country: code
      },
      () => this.getTopHeadlines()
    );
  };


  getTopHeadlines = () => {
    const { category, country } = this.state;
    this.setState({ loading: true });
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&pageSize=50`,
        {
          headers: {
            Authorization: "Bearer " + process.env.REACT_APP_NEWSAPI
          }
        }
      )
      .then(result =>
        this.setState({
          news: result.data.articles,
          loading: false
        })
      )
      .catch(err => console.log(err));
  };
  handleScroll = e => {
    this.setState(
      {
        scrollPosition: window.pageYOffset
      },
      () => this.checkScroll()
    );
  };
  checkScroll = () => {
    if (this.state.scrollPosition > 5000) {
      this.setState({
        displayUpButton: true
      });
    } else {
      this.setState({ displayUpButton: false });
    }
  };
  goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  render() {
    const { category, news, loading} = this.state;
    return (
      <Router>
        <NavBar
          updateCategory={this.updateCategory}
          updateCountry={this.updateCountry}
        />
       <Switch>
        <Route exact path="/search" component={Search} />
        <div className="row">
          <div className="col s12 m8">
            <Main
              category={category}
              news={news}
              loading={loading}
            />
          </div>
          <div className="col s12 m4 center-align">
            <MyClock />
          </div>
          {this.state.displayUpButton ? (
            <div className="fixed-action-btn">
              <button
                className="btn-floating btn-medium purple darken-2"
                onClick={this.goTop}
                style={{ marginBottom: "50px" }}
              >
                <i className="large material-icons">arrow_upward</i>
              </button>
            </div>
          ) : null}
        </div>
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
