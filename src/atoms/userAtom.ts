// Node modules
import { atom } from "jotai";

// Project files
import User from "types/User";

// Properties
const userAtom = atom<User | null>(null);

export default userAtom;
