import React from 'react'
import './style.css'

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="row">
            <p>
              <strong>Gradient Generator</strong> by Andrey Matviyenko.
              <a href="https://github.com/AndreyMatviyenko" className="icon" rel="noopener noreferrer" target="_blank"><i
                className="fa fa-github"/> </a>
            </p>
          </div>
        </div>
      </footer>
    )
  }
}