// Node modules
import { expect, test } from "vitest";

// Project files
import updateItemQuantity from "./updateItemQuantity";
import type CartItem from "types/CartItem";

test("Updates the ammount of items in the cart by any quantity we choose", () => {
  // Arrange
  const cart: CartItem[] = [{ id: 1, sku: "17", quantity: 1 }]; // SEGA Saturn, Skeleton Gray, x1 (one before update)
  const sku = "17";
  const newQuantity = 666;
  const result: CartItem[] = [{ id: 1, sku: "17", quantity: 666 }]; // SEGA Saturn, Skeleton Gray, x666 (six houndred sixty six after update)

  // Act
  const test = updateItemQuantity(cart, sku, newQuantity);

  // Assert
  expect(test).toEqual(result);
});

test("Removes item in cart if we choose 0 as the quantity", () => {
  // Arrange
  const cart: CartItem[] = [{ id: 1, sku: "17", quantity: 1 }]; // SEGA Saturn, Skeleton Gray, x1 (one before update)
  const sku = "17";
  const newQuantity = 0;
  const result: CartItem[] = []; // empty after removing item

  // Act
  const test = updateItemQuantity(cart, sku, newQuantity);

  // Assert
  expect(test).toEqual(result);
});
