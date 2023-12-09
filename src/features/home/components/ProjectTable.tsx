//import stores
import useProjectsStore from "../../../stores/projectsStore";
import useFlowEditorStore from "../../../stores/flowEditorStore";

function ProjectTable() {
  //store selectors
  const [projects, deleteProject] = useProjectsStore((state) => [
    state.projects,
    state.deleteProject,
  ]);

  const setEditingProject = useFlowEditorStore(
    (state) => state.setEditingProject
  );

  const handleStartEditing = (id: string) => {
    const project = projects.find((project) => project.id === id);

    if (project) {
      setEditingProject(project);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* body */}
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td className="flex space-x-2">
                <button
                  onClick={() => handleStartEditing(project.id)}
                  className="btn btn-xs btn-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTable;
