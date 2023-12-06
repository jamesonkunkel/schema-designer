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

export type ObjectNodeData = {
  name: string;
  description: string;
};

function ObjectNode(props: NodeProps<ObjectNodeData>) {
  //store selector
  const [updateNode] = useFlowEditorStore((state) => [state.updateNode]);

  //component state
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [name, setName] = useState(props.data.name);

  const handleSave = () => {
    setIsEditingName(false);
    updateNode(props.id, (prev) => ({ ...prev, data: { ...prev.data, name } }));
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ top: -5, background: "#555" }}
      />

      <div className="card card-compact bg-primary text-primary-content">
        <div className="card-body">
          {!isEditingName && (
            <div className="card-title">
              <h3>
                {props.data.name === "" ? "Unnamed Object" : props.data.name}
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
              <button onClick={handleSave} className="btn btn-xs">
                <SaveIcon />
              </button>
            </div>
          )}
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

export default ObjectNode;
