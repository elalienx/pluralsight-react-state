export default interface StoreActions {
  addItem: (id: number, sku: string) => void;
  updateItemQuantity: (sku: string, quantity: number) => void;
  emptyCart: () => void;
}
