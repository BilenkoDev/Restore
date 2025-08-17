//import { useEffect, useState } from 'react';
//import { Product } from '../../app/models/product';

import ProductList from './ProductList';
import { useFetchProductsQuery } from './catalogApi';

// type Props = {
//   products: Product[];
//     //addProduct: ()=>void;
// };

//export default function Catalog({ products, addProduct }: Props) {
// export default function Catalog({ products }: Props) {
export default function Catalog() {
  //const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   fetch('https://localhost:5001/api/products')
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  // }, []);

  //useFetchProductsQuery is a hook that was created in CatalogAPI
  //isLoading, isfetching, isSuccess, isError, isUninitialized
  //data is a Product array or underfined
  const { data, isLoading } = useFetchProductsQuery();
  if(isLoading || !data ) return <div>Loading ...</div>

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

      {/* <ProductList products={products} /> */}
      <ProductList products={data} />
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
