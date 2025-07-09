import { Product } from '../../app/models/product';
import ProductList from './ProductList';

type Props = {
  products: Product[];
    //addProduct: ()=>void;
};

//export default function Catalog({ products, addProduct }: Props) {
export default function Catalog({ products }: Props) {
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
