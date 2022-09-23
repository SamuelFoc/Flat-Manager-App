import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div>
      <h1 className="color-light">
        Error 420!
        <p>
          Something went wrong.. Please try it again or contact your webmaster.
        </p>
      </h1>
      <Link to="/" className="btn btn-primary">
        Home
      </Link>
    </div>
  );
}
