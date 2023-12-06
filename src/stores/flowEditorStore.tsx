import { applyNodeChanges, applyEdgeChanges } from "reactflow";
import type {
  ReactFlowJsonObject,
  NodeChange,
  EdgeChange,
  Connection,
  Node,
  Edge,
} from "reactflow";

//import libraries
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

//generic node and edge updater functions
type GenericUpdateFn<T> = (prev: T) => T;

interface FlowEditorStore {
  editingFlow: ReactFlowJsonObject;

  updateEditingFlow: (
    flow: ReactFlowJsonObject | GenericUpdateFn<ReactFlowJsonObject>
  ) => void;

  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;

  //plainly add a node to the flow
  addNode: (node: Node) => void;

  //update a node by replacing it with a new node
  updateNode: (
    nodeId: string,
    updatedNode: Node | GenericUpdateFn<Node>
  ) => void;
}

const useFlowEditorStore = createWithEqualityFn<FlowEditorStore>(
  (set, get) => ({
    editingFlow: {
      nodes: [
        {
          id: "root",
          type: "root",
          data: { name: "Root" },
          position: { x: 250, y: 5 },
        },
      ],
      edges: [],
      viewport: {
        zoom: 1,
        x: 0,
        y: 0,
      },
    },

    //update the editingFlow
    updateEditingFlow: (
      flow: ReactFlowJsonObject | GenericUpdateFn<ReactFlowJsonObject>
    ) => {
      const editingFlow = get().editingFlow;

      if (editingFlow !== null) {
        // If `flow` is a function, call it with the previous flow
        if (typeof flow === "function") {
          set(() => ({
            editingFlow: flow(editingFlow),
          }));
        }
        // If `flow` is an object, merge it with the previous flow
        else {
          set(() => ({
            editingFlow: {
              ...editingFlow,
              ...(flow as ReactFlowJsonObject),
            },
          }));
        }
      }
    },

    // monitor node changes
    onNodesChange: (changes: NodeChange[]) => {
      const editingFlow = get().editingFlow;

      if (editingFlow?.nodes !== undefined) {
        const changedNodes = applyNodeChanges(changes, editingFlow.nodes);

        //set the editingFlow with the changed nodes
        set(() => ({
          editingFlow: {
            ...editingFlow,
            nodes: changedNodes,
          },
        }));
      }
    },

    //monitor edge changes
    onEdgesChange: (changes: EdgeChange[]) => {
      const editingFlow = get().editingFlow;

      if (editingFlow?.edges !== undefined) {
        const changedEdges = applyEdgeChanges(changes, editingFlow.edges);

        //set the editingFlow with the changed edges
        set(() => ({
          editingFlow: {
            ...editingFlow,
            edges: changedEdges,
          },
        }));
      }
    },

    //add a node to the editingFlow
    addNode: (node: Node) => {
      const editingFlow = get().editingFlow;

      if (editingFlow?.nodes !== undefined) {
        //add the node to the editingFlow
        set(() => ({
          editingFlow: {
            ...editingFlow,
            nodes: [...editingFlow.nodes, node],
          },
        }));
      }
    },

    updateNode: (nodeId: string, updatedNode: Node | GenericUpdateFn<Node>) => {
      const editingFlow = get().editingFlow;

      if (editingFlow?.nodes !== undefined) {
        const updatedNodes = editingFlow.nodes.map((node) => {
          if (node.id === nodeId) {
            // If `updatedNode` is a function, call it with the previous node
            if (typeof updatedNode === "function") {
              return updatedNode(node);
            }
            // If `updatedNode` is an object, merge it with the previous node
            return {
              ...node,
              ...(updatedNode as Node),
            };
          }
          return node;
        });

        set(() => ({
          editingFlow: {
            ...editingFlow,
            nodes: updatedNodes,
          },
        }));

        console.log("updated node", updatedNode);
      }
    },
  }),
  shallow
);

export default useFlowEditorStore;
