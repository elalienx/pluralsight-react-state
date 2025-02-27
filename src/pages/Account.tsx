// Project files
import { useUser } from "state/userContext";

export default function Account() {
  // Global state
  const { user } = useUser();

  return (
    <>
      <h1>Account</h1>
      {user ? <p>Email: {user.email}</p> : <p>Please log in.</p>}
    </>
  );
}
