// Project files
import useShoeStore from "store/shoeStore";

export function Account() {
  // Global state
  const { user } = useShoeStore();

  return (
    <>
      <h1>Account</h1>
      {user ? <p>Email: {user.email}</p> : <p>Please log in.</p>}
    </>
  );
}
