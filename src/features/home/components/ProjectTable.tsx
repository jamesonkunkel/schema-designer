//import stores
import useProjectsStore from "../../../stores/projectsStore";
import useFlowEditorStore from "../../../stores/flowEditorStore";

function ProjectTable() {
  //store selectors
  const [projects, deleteProject] = useProjectsStore((state) => [
    state.projects,
    state.deleteProject,
  ]);

  const [editingProject, setEditingProject] = useFlowEditorStore((state) => [
    state.editingProject,
    state.setEditingProject,
  ]);

  const handleStartEditing = (id: string) => {
    const project = projects.find((project) => project.id === id);

    if (project) {
      setEditingProject(project);
    }
  };

  const handleDeleteProject = (id: string) => {
    deleteProject(id);

    if (editingProject?.id === id) {
      setEditingProject(null);
    }
  };

  return (
    <div className="overflow-x-auto overflow-y-auto">
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
            <tr
              key={project.id}
              className={editingProject?.id === project.id ? "bg-base-200" : ""}
            >
              <td>{project.name}</td>
              <td className="flex space-x-2">
                <button
                  onClick={() => handleStartEditing(project.id)}
                  className="btn btn-xs btn-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
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
