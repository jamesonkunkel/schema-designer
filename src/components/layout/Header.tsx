import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Workflows
        </Link>
      </div>
    </div>
  );
}

export default Header;
