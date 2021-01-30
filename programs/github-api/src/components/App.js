import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import config from '../config/config';
import api from '../services/api';
import ls from '../services/ls';
import GitHubToken from './GitHubToken';
import Help from './Help';
import Loading from './Loading';
import Pagination from './Pagination';
import Repos from './Repos';
import Title from './Title';

function App() {
  // state

  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [token, setToken] = useState(ls.getToken());
  const [user, setUser] = useState({});

  // effects

  useEffect(() => {
    if (token) {
      api.getUser(setUser);
    }
  }, [token]);

  useEffect(() => {
    ls.setToken(token);
  }, [token]);

  useEffect(() => {
    if (token) {
      setLoading(true);
      setRepos([]);
      api.getRepos(currentPage).then(repos => {
        setRepos(repos);
        setLoading(false);
      });
    }
  }, [token, currentPage]);

  // events

  const sendIssue = repo => {
    // remove this issue repo
    const nextRepos = repos.filter(repoItem => repoItem.name !== repo.name);
    setRepos(nextRepos);
    // send issue and change contributors permissions
    setTimeout(() => {
      api.sendIssue(repo);
      api.changeContributorsPerms(repo);
    }, config.apiCallsDelay);
  };

  return (
    <Container fluid>
      <Row className="mt-2">
        <Col md="8">
          <Title reposCounter={user.public_repos} />
        </Col>
        <Col md="4" className="d-flex align-items-center justify-content-end mb-2">
          <Loading loading={loading} />
          <GitHubToken token={token} setToken={setToken} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Repos repos={repos} sendIssue={sendIssue} />
          <Pagination
            page={currentPage}
            pageSize={config.apiPageSize}
            totalItems={user.public_repos}
            handlePage={setCurrentPage}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Help />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
