import React from 'react';

import './style.scss';
import QuarterPanel from '../QuarterPanel';

function QuartersListData({ data, selectGlossary, scrollPosition, t }) {
  return (
    <div className="QuarterList_main">
      {data.map((res, index) => {
        return (
          <QuarterPanel data={res} key={index} glossaryPanel={selectGlossary} scrollPosition={scrollPosition} t={t} />
        );
      })}
    </div>
  );
}

export default QuartersListData;
