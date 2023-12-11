//import react hooks
import { useState, useEffect } from "react";

//import monaco
import Editor from "@monaco-editor/react";

//import stores
import useFlowEditorStore from "../../stores/flowEditorStore";

//import utils
import { flowToSchema } from "../flow-parser/parser";
import CopyIcon from "../../assets/CopyIcon";

function CodePreview() {
  //store selectors
  const [editingFlow] = useFlowEditorStore((state) => [state.editingFlow]);

  //component state
  const [code, setCode] = useState<string>("");

  //update code preview
  useEffect(() => {
    if (!editingFlow) return;
    setCode(
      JSON.stringify(
        flowToSchema("root", editingFlow.nodes, editingFlow.edges),
        null,
        2
      )
    );
  }, [editingFlow]);

  // function to copy code to clipboard
  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="h-full w-1/2 px-4 py-4 flex flex-col space-y-4">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Code Preview</h1>
        <button onClick={copyCode} className="btn btn-sm btn-accent">
          <CopyIcon />
        </button>
      </div>

      <Editor
        height="100%"
        options={{
          minimap: {
            enabled: false,
          },
          readOnly: true,
          lineNumbers: "off",
        }}
        theme="vs-dark"
        defaultLanguage="json"
        value={code}
      />
    </div>
  );
}

export default CodePreview;
