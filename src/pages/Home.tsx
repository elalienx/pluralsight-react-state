// Node modules
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <h1>Welcome to the store!</h1>
      <p>
        Click on <Link to="/shoes">Shoes</Link> to start
      </p>
    </div>
  );
}

