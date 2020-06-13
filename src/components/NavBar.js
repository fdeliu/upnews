import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import { countryCode } from "../data/countryCode.js";

class NavBar extends Component {
  state = {
    country: "Country"
  };
  updateParent = cat => {
    const sidenav = M.Sidenav.getInstance(document.getElementById('mobile-demo'));
    sidenav.close();
    this.props.updateCategory(cat);
  };
  updateCountry = (country, code) => {
    const sidenav = M.Sidenav.getInstance(document.getElementById('mobile-demo'));
    sidenav.close();
    this.setState({ country });
    this.props.updateCountry(code);
  };
  render() {
    return (
      <div>
        <div className="navbar-fixed">
          <nav className="purple darken-4">
            <ul id="dropdown1" className="dropdown-content">
              {Object.keys(countryCode).map(code => (
                <li
                  key={code}
                  style={{ paddingLeft: "5px" }}
                  onClick={this.updateCountry.bind(
                    this,
                    countryCode[code],
                    code
                  )}
                >
                  {countryCode[code]}
                </li>
              ))}
            </ul>
            <div className="nav-wrapper container">
              <Link to="/news" className="brand-logo">
                UpNews
              </Link>
              <Link
                to="/"
                data-target="mobile-demo"
                className="sidenav-trigger"
              >
                <i className="material-icons">menu</i>
              </Link>
              <ul className="right hide-on-med-and-down">
                <li>
                  <Link
                    to="/"
                    onClick={this.updateParent.bind(this, "business")}
                  >
                    Business
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={this.updateParent.bind(this, "entertainment")}
                  >
                    Entertainment
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={this.updateParent.bind(this, "general")}
                  >
                    General
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={this.updateParent.bind(this, "health")}>
                    Health
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={this.updateParent.bind(this, "science")}
                  >
                    Science
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={this.updateParent.bind(this, "sports")}>
                    Sports
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={this.updateParent.bind(this, "technology")}
                  >
                    Technology
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-trigger"
                    to="/"
                    data-target="dropdown1"
                  >
                    {this.state.country}
                    <i className="material-icons right">arrow_drop_down</i>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <ul id="dropdown2" className="dropdown-content">
          {Object.keys(countryCode).map(code => (
            <li
              key={code}
              style={{ paddingLeft: "5px" }}
              onClick={this.updateCountry.bind(this, countryCode[code], code)}
            >
              {countryCode[code]}
            </li>
          ))}
        </ul>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <Link to="/" onClick={this.updateParent.bind(this, "business")}>
              Business
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={this.updateParent.bind(this, "entertainment")}
            >
              Entertainment
            </Link>
          </li>
          <li>
            <Link to="/" onClick={this.updateParent.bind(this, "general")}>
              General
            </Link>
          </li>
          <li>
            <Link to="/" onClick={this.updateParent.bind(this, "health")}>
              Health
            </Link>
          </li>
          <li>
            <Link to="/" onClick={this.updateParent.bind(this, "science")}>
              Science
            </Link>
          </li>
          <li>
            <Link to="/" onClick={this.updateParent.bind(this, "sports")}>
              Sports
            </Link>
          </li>
          <li>
            <Link to="/" onClick={this.updateParent.bind(this, "technology")}>
              Technology
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link className="dropdown-trigger" 
            to="/" data-target="dropdown2">
              {this.state.country}
              <i className="material-icons right">arrow_drop_down</i>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
