import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function GitHubToken(props) {
  const handleInput = ev => {
    props.setToken(ev.target.value);
  };

  return (
    <InputGroup size="sm" className="ml-2 token-input-group">
      <InputGroup.Prepend>
        <InputGroup.Text id="token">
          <a
            href="https://docs.github.com/es/github/authenticating-to-github/creating-a-personal-access-token"
            title="Crear token de usuario de GitHub"
            target="_blank"
            rel="noreferrer"
          >
            GitHub token:
          </a>
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        className="token-form-control"
        placeholder="Introduce aquí tu GitHub user token"
        value={props.token}
        onChange={handleInput}
      />
    </InputGroup>
  );
}

export default GitHubToken;
