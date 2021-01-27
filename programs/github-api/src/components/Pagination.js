import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

function PaginationComponent(props) {
  const renderPageButtons = () => {
    // prepare pages
    const totalPages = props.totalItems / props.pageSize;
    const pages = [];
    for (let page = 0; page <= totalPages; page += 1) {
      pages.push({
        page,
        number: page + 1
      });
    }
    // render components
    return pages.map(page => {
      return (
        <Pagination.Item
          key={page.page}
          className="mb-1"
          active={props.page === page.page}
          onClick={() => props.handlePage(page.page)}
        >
          {page.number}
        </Pagination.Item>
      );
    });
  };

  return (
    <Pagination size="sm" className="flex-wrap">
      {renderPageButtons()}
    </Pagination>
  );
}

export default PaginationComponent;
