import React from "react";

export default function Footer() {
  let year = new Date().getFullYear();
  return (
    <footer className="white-text purple darken-4">
      <div style={{ padding: "4px", display: "flex" }}>
        <span>
          News powered by{" "}
          <a
            href="https://newsapi.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>News API</strong>
          </a>
        </span>
        <span style={{ marginLeft: "auto" }}>{year} &copy; Flamur Deliu</span>
      </div>
    </footer>
  );
}
