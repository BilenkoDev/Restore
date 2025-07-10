import { useEffect, useState } from 'react';
import { Product } from '../../app/models/product';
import ProductList from './ProductList';

// type Props = {
//   products: Product[];
//     //addProduct: ()=>void;
// };

//export default function Catalog({ products, addProduct }: Props) {
// export default function Catalog({ products }: Props) {
export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      {/* <ul>
        {products.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul> */}
      {/* <button onClick={addProduct}>Add Product</button> */}
      <ProductList products={products} />
    </>
  );
}

// export default function Catalog(props: Props) {
//   return (
//     <>
//       <ul>
//         {props.products.map((item) => (
//           <li key={item.id}>
//             {item.name} - {item.price}
//           </li>
//         ))}
//       </ul>
//       <button onClick={props.addProduct}>Add Product</button>
//     </>
//   );
// }
