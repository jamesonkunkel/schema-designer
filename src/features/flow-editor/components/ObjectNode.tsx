//import reactflow components and types
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";

export type ObjectNodeData = {
  label: string;
};

function ObjectNode(props: NodeProps<ObjectNodeData>) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ top: -5, background: "#555" }}
      />

      <div className="card card-compact bg-primary text-primary-content w-32">
        <div className="card-body">
          <div className="card-title">
            <h3>{props.data.label}</h3>
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

export default ObjectNode;
