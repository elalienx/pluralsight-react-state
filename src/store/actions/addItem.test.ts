// Node modules
import { expect, test } from "vitest";

// Project files
import addItem from "./addItem";
import type CartItem from "types/CartItem";

test("Add item to cart if does not exist in cart", () => {
  // Arrange
  const cart: CartItem[] = [];
  const id = 1;
  const sku = "17";
  const result: CartItem[] = [{ id: 1, sku: "17", quantity: 1 }]; // SEGA Saturn, Skeleton Gray, x1

  // Act
  const test = addItem(cart, id, sku);

  // Assert
  expect(test).toEqual(result);
});

test("Add item to the end of the cart on a full cart", () => {
  // Arrange
  const cart: CartItem[] = [
    { id: 0, sku: "2", quantity: 1 }, // Sony PlayStation, Slim, x1
    { id: 2, sku: "101", quantity: 2 }, // Nintendo 64, Atomic Purple, x2
  ];
  const id = 1;
  const sku = "17";
  const result: CartItem[] = [
    { id: 0, sku: "2", quantity: 1 }, // Sony PlayStation, Slim, x1
    { id: 2, sku: "101", quantity: 2 }, // Nintendo 64, Atomic Purple, x2
    { id: 1, sku: "17", quantity: 1 }, // SEGA Saturn, Skeleton Gray, x1
  ];

  // Act
  const test = addItem(cart, id, sku);

  // Assert
  expect(test).toEqual(result);
});

test("Update item in cart if already exist", () => {
  // Arrange
  const cart: CartItem[] = [{ id: 1, sku: "17", quantity: 5 }]; // SEGA Saturn, Skeleton Gray, x5 (five before update)
  const id = 1;
  const sku = "17";
  const result: CartItem[] = [{ id: 1, sku: "17", quantity: 6 }]; // SEGA Saturn, Skeleton Gray, x6 (six after update)

  // Act
  const test = addItem(cart, id, sku);

  // Assert
  expect(test).toEqual(result);
});
