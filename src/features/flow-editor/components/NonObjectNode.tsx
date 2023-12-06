//import reactflow components and types
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";

export type NonObjectNodeData = {
  label: string;
};

function NonObjectNode(props: NodeProps<NonObjectNodeData>) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ top: -5, background: "#555" }}
      />

      <div className="card card-compact bg-secondary text-primary-content w-32">
        <div className="card-body">
          <div className="card-title">
            <h3>{props.data.label}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default NonObjectNode;
