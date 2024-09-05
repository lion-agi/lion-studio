import React from 'react';
import PageItem from './PageItem';

const PageList = ({ pages }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {pages.map((page) => (
        <PageItem key={page.id} page={page} />
      ))}
    </div>
  );
};

export default PageList;