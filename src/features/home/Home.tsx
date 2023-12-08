//import reactflow provider
import { ReactFlowProvider } from "reactflow";

//import components
import Sidebar from "./components/Sidebar";
import FlowEditor from "../flow-editor/FlowEditor";

function Home() {
  return (
    <div className="flex flex-col space-y-4 px-4 py-4 h-3/4">
      <div className="flex h-full">
        <Sidebar />
        <ReactFlowProvider>
          <FlowEditor />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default Home;
