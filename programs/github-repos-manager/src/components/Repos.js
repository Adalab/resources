import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { IssueReopenedIcon, TrashcanIcon } from '@primer/octicons-react';
import config from '../config/config.json';
import issueTemplate from '../services/issue';
import date from '../utils/date';
import ReposHeader from './ReposHeader';

function Repos(props) {
  // render repo

  const renderRepo = () => {
    return props.repos.map((repo, index) => {
      return (
        <tr key={repo.id}>
          {renderRepoIndex(index)}
          {renderRepoActions(repo)}
          {renderRepoTitle(repo, index)}
          {renderRepoDates(repo)}
          {renderRepoContributors(repo)}
          {renderRepoIssues(repo)}
        </tr>
      );
    });
  };

  // render index
  const renderRepoIndex = index => {
    return (
      <td>
        <span className="fs-m">{index}</span>
      </td>
    );
  };

  // render actions

  const renderRepoActions = (repo, index) => {
    return (
      <td>
        {renderSendIssueButton(repo)}
        {renderDeleteButton(repo)}
      </td>
    );
  };

  const renderSendIssueButton = repo => {
    const issueSent = !!repo.issues.find(issue => issue.title === issueTemplate.title);
    return issueSent || repo.contributors.length === 0 ? null : (
      <Button
        size="sm"
        title="Crear issue en este repo"
        variant="primary"
        onClick={() => props.sendIssue(repo)}
      >
        <IssueReopenedIcon />
      </Button>
    );
  };

  const renderDeleteButton = repo => {
    const issue = repo.issues.find(issue => issue.title === issueTemplate.title);
    const createdAt = issue ? new Date(issue.created_at) : new Date();
    const timeAgo = new Date().getTime() - createdAt.getTime();
    return timeAgo > config.deleteButtonTimeAgo ? (
      <Button
        size="sm"
        title="Crear issue en este repo"
        variant="danger"
        onClick={() => props.sendIssue(repo)}
      >
        <TrashcanIcon />
      </Button>
    ) : null;
  };

  // render title

  const renderRepoTitle = repo => {
    const archivedLabel = repo.archived ? (
      <Badge variant="warning" className="ml-1">
        archivado
      </Badge>
    ) : null;
    const privateLabel = repo.private ? (
      <Badge variant="danger" className="ml-1">
        privado
      </Badge>
    ) : null;
    return (
      <td className="fs-m">
        <a href={repo.html_url} target="_blank" rel="noreferrer" className="font-weight-bold">
          {repo.name}
        </a>
        {privateLabel}
        {archivedLabel}
        <span className="fs-s text-secondary d-block">{repo.description}</span>
      </td>
    );
  };

  // render dates

  const renderRepoDates = repo => {
    return (
      <td className="fs-s">
        <span className="d-block">{date.format(repo.created_at)}</span>
        <span>{date.format(repo.updated_at)}</span>
      </td>
    );
  };

  // render contributors

  const renderRepoContributors = repo => {
    const contributors = repo.contributors.map(contributor => {
      const badgeVariant = config.employees.includes(contributor) ? 'danger' : 'primary';
      return (
        <Badge key={contributor} variant={badgeVariant} className="ml-1 fs-s">
          <a
            href={`//github.com/${contributor}`}
            className="text-white"
            target="_blank"
            rel="noreferrer"
          >
            {contributor}
          </a>
        </Badge>
      );
    });
    return <td>{contributors}</td>;
  };

  // render issues

  const renderRepoIssues = repo => {
    const lis = repo.issues.map((issue, i) => {
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
    return (
      <td className="fs-s">
        <ul className="m-0 p-0 list-unstyled issues__list">{lis}</ul>
      </td>
    );
  };

  return (
    <div className="border bg-white">
      <Table hover size="sm">
        <ReposHeader />
        <tbody>{renderRepo()}</tbody>
      </Table>
    </div>
  );
}

export default Repos;
