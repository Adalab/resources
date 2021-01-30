import React from 'react';

function Title(props) {
  return (
    <h1 className="h3 text-primary font-weight-normal">
      <span>Gestor de repositorios de Adalab:</span>
      <span className="text-muted"> {props.reposCounter} repos</span>
    </h1>
  );
}

export default Title;
