//import components
import { ReactFlowProvider } from "reactflow";
import FlowEditor from "../flow-editor/FlowEditor";

function Home() {
  return (
    <div className="flex flex-col space-y-4 px-4 py-4 h-3/4">
      <h1 className="text-xl">Home</h1>
      <div className="flex h-full">
        <div className="w-1/4 bg-primary h-full space-x-4">Test</div>
        <ReactFlowProvider>
          <FlowEditor />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default Home;
