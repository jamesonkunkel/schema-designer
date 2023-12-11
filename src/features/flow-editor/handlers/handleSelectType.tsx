//import types
import type { StringNodeData } from "../components/StringNode";
import type { NumberNodeData } from "../components/NumberNode";
import type { BooleanNodeData } from "../components/BooleanNode";
import type { ArrayNodeData } from "../components/ArrayNode";

//import stores
import useFlowEditorStore from "../../../stores/flowEditorStore";

const handleSelectType = (nodeId: string, type: string) => {
  const newStringNodeData: StringNodeData = {
    name: "",
    description:
      "This is a string node. It could represent the property of an object like a string.",
    required: true,
  };

  const newNumberNodeData: NumberNodeData = {
    name: "",
    description:
      "This is a number node. It could represent the property of an object like a number.",
    required: true,
  };

  const newBooleanNodeData: BooleanNodeData = {
    name: "",
    description:
      "This is a boolean node. It could represent the property of an object like a boolean.",
    required: true,
  };

  const newArrayNodeData: ArrayNodeData = {
    name: "",
    description:
      "This is an array node. It could represent the property of an object like an array.",
    required: true,
    arrayType: "",
  };

  if (type === "string") {
    useFlowEditorStore.getState().updateNode(nodeId, (prev) => ({
      ...prev,
      type: "stringNode",
      data: newStringNodeData,
    }));
  } else if (type === "number") {
    useFlowEditorStore.getState().updateNode(nodeId, (prev) => ({
      ...prev,
      type: "numberNode",
      data: newNumberNodeData,
    }));
  } else if (type === "boolean") {
    useFlowEditorStore.getState().updateNode(nodeId, (prev) => ({
      ...prev,
      type: "booleanNode",
      data: newBooleanNodeData,
    }));
  } else if (type === "array") {
    useFlowEditorStore.getState().updateNode(nodeId, (prev) => ({
      ...prev,
      type: "arrayNode",
      data: newArrayNodeData,
    }));
  }
};

export default handleSelectType;
