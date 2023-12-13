//import react hooks
import { useState } from "react";

//import reactflow components and types
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";

//import icons
import EditIcon from "../../../assets/EditIcon";
import SaveIcon from "../../../assets/SaveIcon";
import ErrorIcon from "../../../assets/ErrorIcon";

//import handlers
import handleSelectType from "../handlers/handleSelectType";

//import stores
import useFlowEditorStore from "../../../stores/flowEditorStore";

export type NumberNodeData = {
  name: string;
  description: string;
  required: boolean;
  usesMinimum: boolean;
  minimum: number;
  usesMaximum: boolean;
  maximum: number;
};

function NumberNode(props: NodeProps<NumberNodeData>) {
  console.log(props.data);

  //store selector
  const [updateNode] = useFlowEditorStore((state) => [state.updateNode]);

  //name state
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(props.data.name);

  //description state
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(props.data.description);

  //required state
  const [required, setRequired] = useState(props.data.required);

  //minimum state
  const [usesMinimum, setUsesMinimum] = useState(props.data.usesMinimum);
  const [minimum, setMinimum] = useState(
    props.data.minimum ? props.data.minimum : 0
  );

  //maximum state
  const [usesMaximum, setUsesMaximum] = useState(props.data.usesMaximum);
  const [maximum, setMaximum] = useState(
    props.data.maximum ? props.data.maximum : 0
  );

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

  const handleSaveUsesMinimum = () => {
    setUsesMinimum((prevUsesMinimum) => {
      updateNode(props.id, (prev) => ({
        ...prev,
        data: { ...prev.data, usesMinimum: !prevUsesMinimum },
      }));
      return !prevUsesMinimum; // Return the new value for the local state
    });
  };

  const handleSaveMinimum = (minimum: number) => {
    setMinimum(minimum);

    updateNode(props.id, (prev) => ({
      ...prev,
      data: { ...prev.data, minimum },
    }));
  };

  const handleSaveUsesMaximum = () => {
    setUsesMaximum((prevUsesMaximum) => {
      updateNode(props.id, (prev) => ({
        ...prev,
        data: { ...prev.data, usesMaximum: !prevUsesMaximum },
      }));
      return !prevUsesMaximum; // Return the new value for the local state
    });
  };

  const handleSaveMaximum = (maximum: number) => {
    setMaximum(maximum);

    updateNode(props.id, (prev) => ({
      ...prev,
      data: { ...prev.data, maximum },
    }));
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ top: -10, background: "#555", width: 20, height: 20 }}
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

          <select
            defaultValue={"number"}
            className="select select-bordered w-full max-w-xs text-base-content"
            onChange={(e) => {
              handleSelectType(props.id, e.target.value);
            }}
          >
            <option value="">Property type</option>
            <option value="string">string</option>
            <option value="number">number</option>
            <option value="boolean">boolean</option>
            <option value="array">array</option>
          </select>

          {!usesMinimum && (
            <div className="card bg-base-100 px-4 py-1">
              <label className="label cursor-pointer ">
                <span className="label-text">Minimum value?</span>
                <input
                  checked={usesMinimum}
                  type="checkbox"
                  className="checkbox"
                  onChange={handleSaveUsesMinimum}
                />
              </label>
            </div>
          )}

          {usesMinimum && (
            <div className="card bg-base-100 px-4 py-1 flex flex-col space-y-2 ">
              <label className="label cursor-pointer ">
                <span className="label-text">Minimum value?</span>
                <input
                  checked={usesMinimum}
                  type="checkbox"
                  className="checkbox"
                  onChange={handleSaveUsesMinimum}
                />
              </label>

              <input
                type="number"
                value={minimum}
                onChange={(e) => {
                  handleSaveMinimum(parseInt(e.target.value));
                }}
                className="input input-bordered text-base-content nodrag"
              />
            </div>
          )}

          {!usesMaximum && (
            <div className="card bg-base-100 px-4 py-1">
              <label className="label cursor-pointer ">
                <span className="label-text">Maximum value?</span>
                <input
                  checked={usesMaximum}
                  type="checkbox"
                  className="checkbox"
                  onChange={handleSaveUsesMaximum}
                />
              </label>
            </div>
          )}

          {usesMaximum && (
            <div className="card bg-base-100 px-4 py-1 flex flex-col space-y-2 ">
              <label className="label cursor-pointer ">
                <span className="label-text">Maximum value?</span>
                <input
                  checked={usesMaximum}
                  type="checkbox"
                  className="checkbox"
                  onChange={handleSaveUsesMaximum}
                />
              </label>

              <input
                type="number"
                value={maximum}
                onChange={(e) => {
                  handleSaveMaximum(parseInt(e.target.value));
                }}
                className="input input-bordered text-base-content nodrag"
              />
            </div>
          )}

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

export default NumberNode;
