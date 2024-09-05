import React from 'react';
import PageItem from './PageItem';

const PageList = ({ pages }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pages.map((page) => (
        <PageItem key={page.id} page={page} />
      ))}
    </div>
  );
};

export default PageList;