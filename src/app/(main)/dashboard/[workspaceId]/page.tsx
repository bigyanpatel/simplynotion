export const dynamic = "force-dynamic";

import React from "react";

const Workspace = async ({ params }: { params: { workspaceId: string } }) => {
  return <div className="relative">Dynamic Workspace Page</div>;
};

export default Workspace;
