import { Outlet, Link } from "react-router-dom";

//import components
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="w-screen h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
