// Node modules
import { useAtom } from "jotai";
import { NavLink } from "react-router-dom";

// Project files
import useShoeStore from "store/shoeStore"; // Refactor remove
import userAtom from "atoms/userAtom";
import type User from "types/User";

export default function Header() {
  // Global state
  const cart = useShoeStore((state) => state.cart);
  const [user, setUser] = useAtom(userAtom);

  // Properties
  const fakeUser: User = { id: 1, email: "cory@example.com" };
  const itemsInCart = cart.reduce((prev, acc) => prev + acc.quantity, 0);

  // Components
  const AccountLink = <NavLink to="/account">Account</NavLink>;
  const LogInButton = <button onClick={() => setUser(fakeUser)}>Log in</button>;
  const LogOutButton = <button onClick={() => setUser(null)}>Log out</button>;

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
