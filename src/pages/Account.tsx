// Node modules
import { useSnapshot } from "valtio";

// Project files
import { userState } from "state/userState";

export function Account() {
  // Global state
  const { user } = useSnapshot(userState);

  // Components

  return (
    <>
      <h1>Account</h1>
      {user ? <p>Email: {user.email}</p> : <p>Please log in.</p>}
    </>
  );
}
