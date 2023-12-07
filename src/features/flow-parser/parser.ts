//import reactflow types
import type { ReactFlowJsonObject, Node, Edge } from "reactflow";

interface JsonSchema {
  type: "object";
  description?: string;
  properties: {
    [key: string]: JsonSchema;
  };
}

export const flowToSchema = (nodeId: string, nodes: Node[], edges: Edge[]) => {
  //first we identify the root node which has the id of root
  const rootNode = nodes.find((node) => node.id === nodeId);

  if (!rootNode) {
    throw new Error(`Node with ID: ${nodeId} not found.`);
  }

  //create a JsonSchema object to populate with children as properties of it
  const schema: JsonSchema = {
    type: "object",
    description: rootNode.data.description,
    properties: {},
  };

  //determine the children of rootNode using the edges array
  const rootNodeChildren = edges
    .filter((edge) => edge.source === nodeId)
    .map((edge) => edge.target);

  if (rootNodeChildren.length === 0) {
    return schema;
  }

  //for each child, recursively call flowToSchema to get its schema
  rootNodeChildren.forEach((childId) => {
    const childSchema = flowToSchema(childId, nodes, edges);
    schema.properties[childId] = childSchema;
  });

  return schema;
};
