//import reactflow types
import type { ReactFlowJsonObject, Node, Edge } from "reactflow";

interface JsonSchema {
  type: string;
  description?: string;
  properties: {
    [key: string]: any;
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

  //get the nodes that match each child
  const rootNodeChildrenNodes = rootNodeChildren.map((childId) => {
    return nodes.find((node) => node.id === childId);
  }) as Node[];

  //for each child, recursively call flowToSchema to get its schema
  rootNodeChildrenNodes.forEach((childNode) => {
    if (childNode.type === "object") {
      const childSchema = flowToSchema(childNode.id, nodes, edges);
      schema.properties[childNode.data.name] = childSchema;
    } else {
      schema.properties[childNode.data.name] = {
        type: childNode.data.type,
        description: childNode.data.description,
      };
    }
  });

  return schema;
};
