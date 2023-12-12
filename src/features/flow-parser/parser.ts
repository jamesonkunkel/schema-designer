//import reactflow types
import type { ReactFlowJsonObject, Node, Edge } from "reactflow";

interface JsonSchema {
  type: string;
  description?: string;
  properties: {
    [key: string]: any;
  };
  required: string[];
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
    required: [],
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
    if (childNode.type === "object" && childNode.data.name !== "") {
      const childSchema = flowToSchema(childNode.id, nodes, edges);
      schema.properties[childNode.data.name] = childSchema;
    } else if (childNode.type === "stringNode") {
      schema.properties[childNode.data.name] = {
        type: "string",
        description: childNode.data.description,
      };
    } else if (childNode.type === "numberNode") {
      schema.properties[childNode.data.name] = {
        type: "number",
        description: childNode.data.description,
        minimum: childNode.data.usesMinimum
          ? childNode.data.minimum
          : undefined,
        maximum: childNode.data.usesMaximum
          ? childNode.data.maximum
          : undefined,
      };
    } else if (childNode.type === "booleanNode") {
      schema.properties[childNode.data.name] = {
        type: "boolean",
        description: childNode.data.description,
      };
    } else if (childNode.type === "arrayNode" && childNode.data.name !== "") {
      schema.properties[childNode.data.name] = {
        type: "array",
        description: childNode.data.description,
        items:
          childNode.data.arrayType !== ""
            ? { type: childNode.data.arrayType }
            : {},
      };
    }

    if (childNode.data.required && childNode.data.name !== "") {
      schema.required.push(childNode.data.name);
    }
  });

  return schema;
};
