export const dynamic = 'force-dynamic';

import React from 'react';

const File = async ({ params }: { params: { fileId: string } }) => {

  return (
    <div className="relative ">
      Dynamic File Page
    </div>
  );
};

export default File;