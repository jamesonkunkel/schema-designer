import { Link } from "react-router-dom";

//import assets
import HelpIcon from "../../assets/HelpIcon";

function Header() {
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Schema Drafter
        </Link>
      </div>
      <div
        className="flex-none tooltip tooltip-left"
        data-tip="Drag from the bottom handle of the Root node (or any object node) to create a new property."
      >
        <HelpIcon />
      </div>
    </div>
  );
}

export default Header;
