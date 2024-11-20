// Node modules
import { useAtom } from "jotai";

// Project files
import userAtom from "atoms/userAtom";

export default function Account() {
  // Global state
  const [user] = useAtom(userAtom);
  return (
    <>
      <h1>Account</h1>
      {user ? <p>Email: {user.email}</p> : <p>Please log in.</p>}
    </>
  );
}
