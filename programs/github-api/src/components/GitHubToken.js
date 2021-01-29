import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function GitHubToken(props) {
  const handleInput = ev => {
    props.setToken(ev.target.value);
  };

  return (
    <InputGroup size="sm" className="d-inline-block w-75 ml-2">
      <FormControl
        placeholder="Introduce aquí tu GitHub user token"
        className="w-100"
        onChange={handleInput}
        value={props.token}
      />
    </InputGroup>
  );
}

export default GitHubToken;
