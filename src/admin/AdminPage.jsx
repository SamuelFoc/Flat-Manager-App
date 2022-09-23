import { Link } from "react-router-dom";

export default function AdminPage({ children, user }) {
  return (
    <div>
      <h1>PROTECTED PAGE</h1>
      <div className="btn-box">
        <Link to="/" className="btn btn-custom">
          Home
        </Link>
      </div>
    </div>
  );
}
