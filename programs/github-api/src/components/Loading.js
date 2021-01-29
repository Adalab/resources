import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Loading(props) {
  return props.loading ? (
    <Spinner animation="grow" size="sm" variant="primary" className="d-inline-block">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : null;
}

export default Loading;
