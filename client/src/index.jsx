import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'; // not being used
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoListEntry from './components/RepoListEntry.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      repos: []
    }
  }
  componentDidMount() {
    axios.get("/repos")
      .then(response => {
        // console.log(response.data);
        this.setState({
          repos: response.data
        })
      })
      .catch(err => {
        console.error(err);
      })
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    axios.post("/repos", {
        user: term
      })
      .then((response) => {
        axios.get("/repos")
          .then(response => {
            // console.log(response.data);
            this.setState({
              repos: response.data
            })
          })
          .catch(err => {
            console.error(err);
          })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render () {
    return (
      <div>
        <h1>Github Fetcher</h1>
        <Search onSearch={this.search.bind(this)}/>
        <RepoList repos={this.state.repos}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));