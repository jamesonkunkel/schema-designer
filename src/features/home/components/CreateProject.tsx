//import react hooks
import { useState } from "react";

//import stores
import { useProjectsStore } from "../../../stores/projectsStore";

//import utils
import { nanoid } from "nanoid";

function CreateProject() {
  //store selector
  const addProject = useProjectsStore((state) => state.addProject);

  //local state
  const [name, setName] = useState("");

  //handle submit
  const submit = () => {
    if (name === "") return;

    const id = nanoid();

    addProject({
      id,
      name,
    });

    setName("");
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Schema name"
        className="input input-bordered w-full max-w-xs"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="btn btn-primary" onClick={submit}>
        Create Schema
      </button>
    </div>
  );
}

export default CreateProject;
