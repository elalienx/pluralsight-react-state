// Node modules
import { atom } from "jotai";

// Project files
import type CartItem from "types/CartItem";

const cartAtom = atom<CartItem[]>([]);

export default cartAtom;
