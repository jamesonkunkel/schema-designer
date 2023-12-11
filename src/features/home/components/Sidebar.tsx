import CreateProject from "./CreateProject";
import ProjectTable from "./ProjectTable";

import { useEffect } from "react";

import useProjectsStore from "../../../stores/projectsStore";

function Sidebar() {
  const fetchProjects = useProjectsStore((state) => state.fetchProjects);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="h-full w-1/5 px-4 py-4 card bg-neutral">
      <CreateProject />
      <ProjectTable />
    </div>
  );
}

export default Sidebar;
