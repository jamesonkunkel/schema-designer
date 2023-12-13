//import react hooks
import { useState } from "react";

//import reactflow components and types
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";

//import icons
import EditIcon from "../../../assets/EditIcon";
import SaveIcon from "../../../assets/SaveIcon";

//import stores
import useFlowEditorStore from "../../../stores/flowEditorStore";

export type RootNodeData = {
  name: string;
  description: string;
  additionalProperties: boolean;
};

function RootNode(props: NodeProps<RootNodeData>) {
  //store selector
  const [updateNode] = useFlowEditorStore((state) => [state.updateNode]);

  //component state
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(props.data.description);
  const [additionalProperties, setAdditionalProperties] = useState(
    props.data.additionalProperties
  );

  const handleSaveDescription = () => {
    setIsEditingDescription(false);
    updateNode(props.id, (prev) => ({
      ...prev,
      data: { ...prev.data, description },
    }));
  };

  const handleSaveAdditionalProperties = () => {
    setAdditionalProperties(!additionalProperties);

    updateNode(props.id, (prev) => ({
      ...prev,
      data: { ...prev.data, additionalProperties: !additionalProperties },
    }));
  };

  return (
    <>
      <div className="card card-compact bg-primary text-primary-content max-w-sm">
        <div className="card-body">
          <div className="card-title text-2xl">
            <h3>
              {props.data.name === "" ? "Unnamed Object" : props.data.name}
            </h3>
          </div>

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

          <div className="card bg-base-100 px-4 py-1">
            <label className="label cursor-pointer ">
              <span className="label-text">Allow additional properties?</span>
              <input
                checked={additionalProperties}
                type="checkbox"
                className="checkbox"
                onChange={handleSaveAdditionalProperties}
              />
            </label>
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ bottom: -5, background: "#555" }}
      />
    </>
  );
}

export default RootNode;
