import React, { Component } from 'react';
import { getCommits } from '../services/services';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';

class App extends Component {
  state = {
    commits: [],
    currentPage: 1
  };



  componentDidMount() {
    getCommits()
      .then((commits) => {
        if (commits === null) return;
        this.setState({ commits });
      })
  }

  pageHandler(pageAdd) {
    const nextPage = this.state.currentPage + pageAdd;
    if(nextPage <= 0) {
      return;
    }

    getCommits(nextPage)
      .then((commits) => {
        if (commits === null) return;
        if (commits.length === 0) return alert('There are not more commits');  
        this.setState({ commits, currentPage: nextPage });
      })
  }

  render() {
    return (
      <div className="container-fluid">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Sha</th>
              <th scope="col">Author</th>
              <th scope="col">Message</th>
              <th scope="col">Date</th>
              <th scope="col">URL</th>
            </tr>
          </thead>

          <tbody>
            {this.state.commits.map((commit, index) => {
              return <tr key={commit.sha}>
                <th scope="row">{index + 1}</th>
                <td>{commit.sha}</td>
                <td>{`${commit.author.name} - ${commit.author.email}`}</td>
                <td>{commit.message}</td>
                <td>{new Date(commit.author.date).toLocaleString()}</td>
                <td><a href={commit.url} target="_blank">{commit.url}</a></td>
              </tr>
            })}
          </tbody>
        </table>

        <nav aria-label="pagination">
          <ul className="pagination">
            <li className={`page-item ${this.state.currentPage === 1 ? 'disabled': ''}` }>
              <a onClick={ () => this.pageHandler(-1) } className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
            </li>

            <li className="page-item" >
              <a onClick={ () => this.pageHandler(1) } className="page-link" href="#">Next</a>
            </li>

          </ul>

          <div className="page-item">
            <span className="page-label">CurrentPage: {this.state.currentPage} </span>
          </div>

        </nav>
      </div>
    )
  }

}

export default App;