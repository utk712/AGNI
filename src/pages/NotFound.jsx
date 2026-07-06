import { Link } from "react-router-dom";
import { Leaf } from "../components/Icons";

function NotFound() {
  return (
    <div className="not-found">
      <span className="stamp" style={{ width: 56, height: 56, fontSize: 26 }}>
        <Leaf />
      </span>
      <h1>This page wandered off</h1>
      <p>We couldn't find what you were looking for. Let's get you back on track.</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
