//import react hooks
import { nanoid } from "nanoid";
import { useCallback, useRef } from "react";

//import stores
import useFlowEditorStore from "../../stores/flowEditorStore";

//import reactflow
import ReactFlow, { Background, Panel, addEdge, useReactFlow } from "reactflow";
import type { Edge, OnConnectStartParams, Connection, Node } from "reactflow";
import "reactflow/dist/style.css";

//import node types
import RootNode from "./components/RootNode";
import SelectorNode from "./components/SelectorNode";
import ObjectNode from "./components/ObjectNode";
import NonObjectNode from "./components/NonObjectNode";

//import node data types
import type { SelectorNodeData } from "./components/SelectorNode";
import type { ObjectNodeData } from "./components/ObjectNode";
import type { NonObjectNodeData } from "./components/NonObjectNode";

//import utils
import { flowToSchema } from "../flow-parser/parser";

const nodeTypes = {
  root: RootNode,
  selector: SelectorNode,
  object: ObjectNode,
  nonObject: NonObjectNode,
};

function FlowEditor() {
  //ref to react flow wrapper div and connecting node id
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef<string | null>(null);

  //store selector
  const [
    editingFlow,
    updateEditingFlow,
    onNodesChange,
    onEdgesChange,
    updateNode,
  ] = useFlowEditorStore((state) => [
    state.editingFlow,
    state.updateEditingFlow,
    state.onNodesChange,
    state.onEdgesChange,
    state.updateNode,
  ]);

  const { screenToFlowPosition } = useReactFlow();

  const onConnectStart = useCallback((e: any, params: OnConnectStartParams) => {
    connectingNodeId.current = params.nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event: any) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = nanoid();

        const newNode: Node<SelectorNodeData> = {
          id,
          type: "selector",
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { setIsObject: handleSelectNodeType },
        };

        const newEdge: Edge = {
          id: `${connectingNodeId.current}-${id}`,
          source: connectingNodeId.current,
          target: id,
        };

        updateEditingFlow((prev) => ({
          ...prev,
          nodes: [...prev.nodes, newNode],
          edges: [...prev.edges, newEdge],
        }));
      }
    },
    [screenToFlowPosition]
  );

  const onConnect = (connection: Connection) => {
    // reset the start node on connections
    connectingNodeId.current = null;

    updateEditingFlow((prev) => ({
      ...prev,
      edges: addEdge(connection, prev.edges),
    }));
  };

  const handleSelectNodeType = (nodeId: string, isObject: boolean) => {
    const newObjNodeData: ObjectNodeData = {
      name: "",
      description:
        "This is a description of an object. This is a much longer description. It is so long and has nothing else to say. I am just writing random stuff now to add more description!",
    };

    const newNonObjNodeData: NonObjectNodeData = {
      name: "",
      description:
        "This is a non-object node. It could represent the property of an object like a string.",
      type: "",
    };

    updateNode(nodeId, (prev) => ({
      ...prev,
      type: isObject ? "object" : "nonObject",
      data: isObject ? newObjNodeData : newNonObjNodeData,
    }));
  };

  const logFlowToSchema = () => {
    console.log(flowToSchema("root", editingFlow.nodes, editingFlow.edges));
  };

  return (
    <div className="w-3/4 h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={editingFlow.nodes}
        edges={editingFlow.edges}
        proOptions={{ hideAttribution: true }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Background
          color="oklch(var(--nc))"
          style={{
            backgroundColor: "oklch(var(--n))",
          }}
        />
        <Panel position="top-left">
          <button onClick={logFlowToSchema} className="btn btn-success">
            To Schema
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default FlowEditor;
