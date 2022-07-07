import React from 'react';
function GitHubToken(props) {
  const handleInput = ev => {
    props.setToken(ev.target.value);
  };

  return (
    <div size="sm" className="ml-2 token-input-group">
      <a
        href="https://docs.github.com/es/github/authenticating-to-github/creating-a-personal-access-token"
        title="Crear token de usuario de GitHub"
        target="_blank"
        rel="noreferrer"
      >GitHub token:  </a>
      <input
        className="token-form-control"
        placeholder="Introduce aquí tu GitHub user token"
        value={props.token}
        onChange={handleInput}
      />
    </div>
  );
}

export default GitHubToken;
