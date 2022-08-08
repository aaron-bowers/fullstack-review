import React from 'react';

const RepoListEntry = ({repo}) => {
  // console.log(repo);

  return (
  <div className="repo">
    <div className="owner">GitHub User: {repo.owner}</div>
    <div className="name">
      <a href={repo['html_url']} target="_blank">Repo Name: {repo.name}</a>
    </div>
    {/* <div className="node-id">Node ID: {repo['node_id']}</div> */}
    <div className="forks">Number of Forks: {repo['forks_count']}</div>
  </div>
  )
}

export default RepoListEntry;