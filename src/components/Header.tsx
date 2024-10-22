// Node modules
import { Link, NavLink } from "react-router-dom";

// Project files
import { useCart } from "state/cartContext";
import { useUser } from "state/userContext";

export default function Header() {
  // Global state
  const { cart } = useCart();
  const { user, setUser } = useUser();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img alt="Carved Rock Fitness" src="/images/logo.png" />
            </Link>
          </li>
          <li>
            <NavLink to="/shoes">Shoes</NavLink>
          </li>
          <li>
            <NavLink to="/cart">
              Cart (
              {cart.reduce((prev, acc) => {
                return prev + acc.quantity;
              }, 0)}
              )
            </NavLink>
          </li>
          <li>
            {user ? (
              <NavLink to="/account">Account</NavLink>
            ) : (
              <button
                onClick={() => setUser({ id: 1, email: "cory@example.com" })}
              >
                Log in
              </button>
            )}
          </li>
          {user && (
            <li>
              <button onClick={() => setUser(null)}>Log out</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
