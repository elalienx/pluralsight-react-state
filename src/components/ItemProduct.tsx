// Node modules
import { Link } from "react-router-dom";

// Project files
import type Product from "types/Product";

interface Props {
  item: Product;
  category: string | undefined;
  onDelete: {
    mutate: Function;
  };
}

export default function ItemProduct({ item, category, onDelete }: Props) {
  const { id, name, price, image } = item;

  // Safeguard
  if (!category) return <p>❌ This product does not belong to any category</p>;

  return (
    <div className="product">
      <Link to={`/${category}/${id}`}>
        <img src={`/images/${image}`} alt={name} />
        <h3>{name}</h3>
        <p>${price}</p>
      </Link>
      <button onClick={() => onDelete.mutate(id)}>🗑️ Delete</button>
    </div>
  );
}
