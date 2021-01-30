import config from '../config/config';
import issueTemplate from './issue';
import ls from './ls';

// user

const getUser = callback => {
  call('orgs/Adalab').then(user => {
    callback({ public_repos: user.public_repos });
  });
};

// repos

const getRepos = page => {
  let repos;
  return call('orgs/Adalab/repos', 'GET', {
    sort: 'created',
    direction: 'asc',
    page
  })
    .then(data => (repos = parseRepos(data)))
    .then(() => Promise.all(repos.map(getContributors)))
    .then(contributors => setContributors(repos, contributors))
    .then(() => Promise.all(repos.map(getIssues)))
    .then(issues => setIssues(repos, issues))
    .then(() => repos);
};

const parseRepos = repos => {
  return repos.map(repo => ({
    id: repo.id,
    html_url: repo.html_url,
    name: repo.name,
    description: repo.description,
    updated_at: repo.updated_at,
    created_at: repo.created_at,
    private: repo.private,
    archived: repo.archived
  }));
};

// contributors

const getContributors = repo => {
  return call(`repos/Adalab/${repo.name}/contributors`);
};

const setContributors = (repos, contributors) => {
  repos.forEach((repo, i) => {
    repo.contributors = contributors[i].filter(
      contributor => contributor.login !== 'dependabot[bot]'
    );
    repo.contributors = repo.contributors.map(contributor => {
      return contributor.login;
    });
  });
};

// issues

const getIssues = repo => {
  return call(`repos/Adalab/${repo.name}/issues`);
};

const setIssues = (repos, issues) => {
  repos.forEach((repo, i) => {
    repo.issues = issues[i].map(issue => {
      return {
        title: issue.title,
        body: issue.body,
        user: issue.user.login,
        assignees: issue.assignees,
        created_at: issue.created_at,
        html_url: issue.html_url,
        number: issue.number,
        state: issue.state
      };
    });
  });
};

const sendIssue = repo => {
  repo.contributors = repo.contributors.filter(
    contributor => !config.employees.includes(contributor)
  );
  call(`repos/Adalab/${repo.name}/issues`, 'POST', undefined, {
    title: issueTemplate.title,
    body: issueTemplate.render(repo),
    assignees: repo.contributors
  }).then(response => {
    if (response.errors) {
      repo.contributors = repo.contributors.filter(
        contributor => contributor !== response.errors[0].value
      );
      sendIssue(repo);
    }
  });
};

const changeContributorsPerms = repo => {
  repo.contributors.forEach(contributor => {
    call(`repos/Adalab/${repo.name}/collaborators/${contributor}`, 'PUT', undefined, {
      permission: 'admin'
    });
  });
};

// helpers

const call = (path, method, query, body) => {
  return fetch(`${config.apiBaseUrl}${path}${queryObjToString(query)}`, {
    method: (method || 'GET').toUpperCase(),
    headers: {
      authorization: `token ${ls.get('token')}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  }).then(response => (response.status === 200 ? response.json() : []));
};

const queryObjToString = (query = {}) => {
  const result = [];
  for (const key in query) {
    result.push(`${key}=${query[key]}`);
  }
  return result.length > 0 ? '?' + result.join('&') : '';
};

const exportObject = {
  getUser,
  getRepos,
  sendIssue,
  changeContributorsPerms
};

export default exportObject;
