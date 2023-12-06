//import react router dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import components
import Layout from "./components/layout/Layout";
import Home from "./features/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
