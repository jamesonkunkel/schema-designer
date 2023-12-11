//import react hooks
import { useState } from "react";

//import reactflow components and types
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";

//import icons
import EditIcon from "../../../assets/EditIcon";
import SaveIcon from "../../../assets/SaveIcon";
import ErrorIcon from "../../../assets/ErrorIcon";

//import stores
import useFlowEditorStore from "../../../stores/flowEditorStore";

//import handlers
import handleSelectType from "../handlers/handleSelectType";

export type BooleanNodeData = {
  name: string;
  description: string;
  required: boolean;
};

function BooleanNode(props: NodeProps<BooleanNodeData>) {
  //store selector
  const [updateNode] = useFlowEditorStore((state) => [state.updateNode]);

  //component state
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [name, setName] = useState(props.data.name);
  const [description, setDescription] = useState(props.data.description);
  const [required, setRequired] = useState(props.data.required);

  const handleSaveName = () => {
    setIsEditingName(false);
    updateNode(props.id, (prev) => ({ ...prev, data: { ...prev.data, name } }));
  };

  const handleSaveDescription = () => {
    setIsEditingDescription(false);
    updateNode(props.id, (prev) => ({
      ...prev,
      data: { ...prev.data, description },
    }));
  };

  const handleSaveRequired = () => {
    setRequired(!required);

    updateNode(props.id, (prev) => ({
      ...prev,
      data: { ...prev.data, required: !required },
    }));
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ top: -5, background: "#555" }}
      />

      <div className="card card-compact bg-secondary text-primary-content max-w-sm">
        <div className="card-body">
          {!isEditingName && (
            <div className="card-title text-2xl">
              {props.data.name === "" && <ErrorIcon />}
              <h3>
                {props.data.name === "" ? "Unnamed Property" : props.data.name}
              </h3>
              <button
                onClick={() => setIsEditingName(true)}
                className="btn btn-xs"
              >
                <EditIcon />
              </button>
            </div>
          )}

          {isEditingName && (
            <div className="card-title text-base-content">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name of object"
                className="input input-bordered w-full max-w-xs"
              />
              <button onClick={handleSaveName} className="btn btn-xs">
                <SaveIcon />
              </button>
            </div>
          )}

          {!isEditingDescription && (
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-bold">Description: </h3>
              <div className="flex space-x-3">
                <p>{props.data.description}</p>
                <button
                  onClick={() => setIsEditingDescription(true)}
                  className="btn btn-xs"
                >
                  <EditIcon />
                </button>
              </div>
            </div>
          )}

          {isEditingDescription && (
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-bold">Description: </h3>
              <div className="flex space-x-3">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description of object"
                  className="input input-bordered w-full h-64 text-base-content resize-none nodrag nozoom"
                />
                <button onClick={handleSaveDescription} className="btn btn-xs">
                  <SaveIcon />
                </button>
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            <select
              defaultValue={"boolean"}
              className="select select-bordered w-full max-w-xs text-base-content"
              onChange={(e) => {
                handleSelectType(props.id, e.target.value);
              }}
            >
              <option value="string">string</option>
              <option value="number">number</option>
              <option value="boolean">boolean</option>
              <option value="array">array</option>
            </select>
          </div>

          <div className="card bg-base-100 px-4 py-1">
            <label className="label cursor-pointer ">
              <span className="label-text">Required?</span>
              <input
                checked={required}
                type="checkbox"
                className="checkbox"
                onChange={handleSaveRequired}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default BooleanNode;
