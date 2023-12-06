//import reactflow components and types
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";

export type SelectorNodeData = {
  setIsObject: (id: string, isObject: boolean) => void;
};

function SelectorNode(props: NodeProps<SelectorNodeData>) {
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
              onClick={() => props.data.setIsObject(props.id, true)}
              className="btn btn-sm"
            >
              Yes
            </button>
            <button
              onClick={() => props.data.setIsObject(props.id, false)}
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
