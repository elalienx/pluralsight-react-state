// Node modules
import { atomWithStorage } from "jotai/utils";

// Project files
import type CartItem from "types/CartItem";

// Properties
const initialState: CartItem[] = [];
const cartAtom = atomWithStorage("jotai-cart", initialState);

export default cartAtom;
