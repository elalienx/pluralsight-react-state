// Project files
import useShoeStore from "store/shoeStore";

export default function Account() {
  // Global state
  // const { user } = useShoeStore(); // short syntax: but will re-render if any other state in the store changes.
  const user = useShoeStore((state) => state.user); // performance syntax by referencing only this state in the whole store.

  return (
    <>
      <h1>Account</h1>
      {user ? <p>Email: {user.email}</p> : <p>Please log in.</p>}
    </>
  );
}
