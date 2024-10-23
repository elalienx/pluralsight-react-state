// Node modules
import userAtom from "atoms/userAtom";

// Project files
import { useAtom } from "jotai";

export function Account() {
  // Global state
  const [user] = useAtom(userAtom);
  return (
    <>
      <h1>Account</h1>
      {user ? <p>Email: {user.email}</p> : <p>Please log in.</p>}
    </>
  );
}
