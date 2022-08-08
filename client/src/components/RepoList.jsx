import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = ({repos}) => {
  // console.log(repos);

  return (
  <div>
    <h4> Repo List Component </h4>
    These are the top {repos.length} repos.
    <div className="repos-container">
      {repos.map((repo, id) => (
        <RepoListEntry key={id + 1} repo={repo}/>
      ))}
    </div>
  </div>
  )
}

export default RepoList;