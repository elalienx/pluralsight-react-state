// Node modules
import { useSnapshot } from "valtio";
import { NavLink } from "react-router-dom";

// Project files
import type User from "types/User";
import { logIn, logOut, userState } from "state/userState";
import { cartState } from "state/cartState";

export default function Header() {
  // Global state
  const { cart } = useSnapshot(cartState);
  const { user } = useSnapshot(userState);

  // Properties
  const demoUser: User = { id: 1, email: "cory@example.com" };
  const itemsInCart = cart.reduce((prev, acc) => prev + acc.quantity, 0);

  // Components
  const AccountLink = <NavLink to="/account">Account</NavLink>;
  const LogInButton = <button onClick={() => logIn(demoUser)}>Log in</button>;
  const LogOutButton = <button onClick={() => logOut()}>Log out</button>;

  return (
    <header>
      <nav>
        <ul>
          <li>
            <img alt="Carved Rock Fitness" src="/images/logo.png" />
          </li>
          <li>
            <NavLink to="/shoes">Shoes</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Cart ({itemsInCart})</NavLink>
          </li>
          <li>{user ? AccountLink : LogInButton}</li>
          {user && <li>{LogOutButton}</li>}
        </ul>
      </nav>
    </header>
  );
}
