//import stores
import { useProjectsStore } from "../../../stores/projectsStore";

function ProjectTable() {
  //store selector
  const projects = useProjectsStore((state) => state.projects);

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
                <button className="btn btn-xs btn-secondary">Edit</button>
                <button className="btn btn-xs btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTable;
