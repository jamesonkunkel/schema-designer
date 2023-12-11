//import reactflow components and types
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";

//import node data types
import type { ObjectNodeData } from "./ObjectNode";
import type { StringNodeData } from "./StringNode";

//import stores
import useFlowEditorStore from "../../../stores/flowEditorStore";

export type SelectorNodeData = {};

function SelectorNode(props: NodeProps<SelectorNodeData>) {
  const updateNode = useFlowEditorStore((state) => state.updateNode);

  const handleSelectNodeType = (nodeId: string, isObject: boolean) => {
    const newObjNodeData: ObjectNodeData = {
      name: "",
      description:
        "This is a description of an object. This is a much longer description. It is so long and has nothing else to say. I am just writing random stuff now to add more description!",
      required: true,
    };

    // by default we will create a string node
    const newStringNodeData: StringNodeData = {
      name: "",
      description:
        "This is a string node. It could represent the property of an object like a string.",
      required: true,
    };

    updateNode(nodeId, (prev) => ({
      ...prev,
      type: isObject ? "object" : "stringNode",
      data: isObject ? newObjNodeData : newStringNodeData,
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

      <div className="card card-compact bg-info text-info-content w-32">
        <div className="card-body">
          <div className="card-title">
            <h3>Is this an object?</h3>
          </div>
          <div className="card-actions">
            <button
              onClick={() => handleSelectNodeType(props.id, true)}
              className="btn btn-sm"
            >
              Yes
            </button>
            <button
              onClick={() => handleSelectNodeType(props.id, false)}
              className="btn btn-sm"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectorNode;
