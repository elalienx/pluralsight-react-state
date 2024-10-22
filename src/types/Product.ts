// Project files
import Sku from "./Sku";

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  skus: Sku[];
};

export default Product;
