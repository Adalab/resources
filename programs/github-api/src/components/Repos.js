import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { IssueReopenedIcon, TrashcanIcon } from '@primer/octicons-react';
import issueTemplate from '../services/issue';
import employees from '../services/employees';

import date from '../utils/date';

function Repos(props) {
  const renderTableHeader = () => {
    return (
      <thead className="fs-m">
        <tr>
          <th>Acciones</th>
          <th>Repo</th>
          <th>Fecha</th>
          <th>Contribuidores</th>
          <th>Issues</th>
        </tr>
      </thead>
    );
  };

  const renderTableRows = () => {
    return props.repos.map(repo => {
      return (
        <tr key={repo.id} className={getRowClass(repo)}>
          <td>
            {renderSendIssueButton(repo)}
            {renderDeleteButton(repo)}
          </td>
          <td className="fs-m">
            <a href={repo.html_url} target="_blank" rel="noreferrer" className="font-weight-bold">
              {repo.name}
            </a>
            {renderPrivateLabel(repo)}
            {renderArchivedLabel(repo)}
            <span className="fs-s text-secondary d-block">{repo.description}</span>
          </td>
          <td className="fs-s">
            <span className="d-block">{date.format(repo.created_at)}</span>
            <span>{date.format(repo.updated_at)}</span>
          </td>
          <td className="fs-s">{repo.contributors.join(', ')}</td>
          <td className="fs-s">{renderIssues(repo.issues)}</td>
        </tr>
      );
    });
  };

  const renderPrivateLabel = repo => {
    return repo.private ? <Badge variant="primary">privado</Badge> : null;
  };

  const renderArchivedLabel = repo => {
    return repo.archived ? <Badge variant="primary">archivado</Badge> : null;
  };

  const renderIssues = issues => {
    const htmlCode = issues.map((issue, i) => {
      return (
        <li key={i} className={issue.state === 'open' ? '' : 'text-danger'}>
          <span className="font-weight-bold">
            #{issue.number} {issue.user}:
          </span>
          <span> {date.format(issue.created_at)}</span>
          <a
            className="d-block text-truncate pb-1"
            href={issue.html_url}
            target="_blank"
            title={issue.body}
            rel="noreferrer"
          >
            {issue.title}
          </a>
        </li>
      );
    });
    return <ul className="m-0 p-0 list-unstyled issues__list">{htmlCode}</ul>;
  };

  const renderSendIssueButton = repo => {
    const issueSent = !!repo.issues.find(issue => issue.title === issueTemplate.title);
    return issueSent || repo.contributors.length === 0 ? null : (
      <Button
        variant="primary"
        size="sm"
        onClick={() => props.sendIssue(repo)}
        title="Crear issue en este repo"
      >
        <IssueReopenedIcon />
      </Button>
    );
  };

  const renderDeleteButton = repo => {
    const daysAgo = 15 * 24 * 60 * 60 * 1000; // 15 days ago
    const issue = repo.issues.find(issue => issue.title === issueTemplate.title);
    const createdAt = issue ? new Date(issue.created_at) : new Date();
    const timeAgo = new Date().getTime() - createdAt.getTime();

    return timeAgo > daysAgo ? (
      <Button
        variant="danger"
        size="sm"
        onClick={() => props.sendIssue(repo)}
        title="Crear issue en este repo"
      >
        <TrashcanIcon />
      </Button>
    ) : null;
  };

  const getRowClass = repo => {
    const isEmployee = repo.contributors.find(contributor =>
      employees.employees.includes(contributor)
    );
    if (repo.private || isEmployee) {
      return 'repo-danger bg-danger';
    } else {
      return '';
    }
  };

  return (
    <div className="border">
      <Table striped hover size="sm">
        {renderTableHeader()}
        <tbody>{renderTableRows()}</tbody>
      </Table>
    </div>
  );
}

export default Repos;
