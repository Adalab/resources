import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Repos from './Repos';
import Pagination from './Pagination';
import api from '../services/api';
import Loading from './Loading';

const pageSize = 30;

function App() {
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState({});
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getUser(setUser);
  }, []);

  useEffect(() => {
    setLoading(true);
    setRepos([]);
    api.getRepos(page).then(repos => {
      setRepos(repos);
      setLoading(false);
    });
  }, [page]);

  // events

  const sendIssue = repo => {
    const nextRepos = repos.filter(repoItem => repoItem.name !== repo.name);
    setRepos(nextRepos);
    setTimeout(() => {
      api.sendIssue(repo);
      api.changeContributorsPerms(repo);
    }, 10000);
  };

  return (
    <Container fluid>
      <Row>
        <Col md="11">
          <h1 className="h4">
            Gestor de repositorios de Adalab
            <span className="text-secondary"> ({user.public_repos} repos)</span>
          </h1>
        </Col>
        <Col md="1" className="text-right">
          <Loading loading={loading} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Repos repos={repos} sendIssue={sendIssue} />
          <Pagination
            page={page}
            totalItems={user.public_repos}
            pageSize={pageSize}
            handlePage={setPage}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
