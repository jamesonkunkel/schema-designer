//import reactflow provider
import { ReactFlowProvider } from "reactflow";

//import components
import Sidebar from "./components/Sidebar";
import FlowEditor from "../flow-editor/FlowEditor";
import CodePreview from "../code-preview/CodePreview";

function Home() {
  return (
    <div className="flex flex-col space-y-4 px-4 py-4 h-5/6">
      <div className="flex h-full">
        <Sidebar />
        <ReactFlowProvider>
          <FlowEditor />
        </ReactFlowProvider>
        <CodePreview />
      </div>
    </div>
  );
}

export default Home;
