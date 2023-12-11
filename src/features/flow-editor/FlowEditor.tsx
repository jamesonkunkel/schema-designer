//import react hooks
import { nanoid } from "nanoid";
import { useCallback, useRef, useEffect } from "react";

//import stores
import useFlowEditorStore from "../../stores/flowEditorStore";
import useProjectsStore from "../../stores/projectsStore";

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

  //store selectors
  const [
    editingProject,
    editingFlow,
    updateEditingFlow,
    onNodesChange,
    onEdgesChange,
    updateNode,
  ] = useFlowEditorStore((state) => [
    state.editingProject,
    state.editingFlow,
    state.updateEditingFlow,
    state.onNodesChange,
    state.onEdgesChange,
    state.updateNode,
  ]);

  const updateProject = useProjectsStore((state) => state.updateProject);

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
          data: {},
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

  const handleSave = () => {
    if (!editingFlow || !editingProject) return;

    updateProject(editingProject.id, (prev) => ({
      ...prev,
      flow: editingFlow,
    }));
  };

  //TODO: make save debounced
  useEffect(() => {
    handleSave();
  }, [editingFlow]);

  if (!editingFlow)
    return <div className="w-full h-full">Select a schema project.</div>;

  return (
    <div className="w-full h-full" ref={reactFlowWrapper}>
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
      </ReactFlow>
    </div>
  );
}

export default FlowEditor;
