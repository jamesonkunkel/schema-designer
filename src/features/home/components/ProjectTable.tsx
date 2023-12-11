//import stores
import useProjectsStore from "../../../stores/projectsStore";
import useFlowEditorStore from "../../../stores/flowEditorStore";

//import assets
import EditIcon from "../../../assets/EditIcon";
import DeleteIcon from "../../../assets/DeleteIcon";

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
    <div className="overflow-x-auto overflow-y-auto text-neutral-content">
      <table className="table">
        {/* head */}
        <thead className="text-neutral-content">
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
                  <EditIcon />
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="btn btn-xs btn-error"
                >
                  <DeleteIcon />
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
