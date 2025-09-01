// import { useEffect, useState } from 'react';
// import { Product } from '../../app/models/product';
import { useParams } from 'react-router-dom';
import {
  Button,
  Divider,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useFetchProductDetailsQuery } from './catalogApi';
import {
  useRemoveBasketItemMutation,
  useAddBasketItemMutation,
  useFetchBasketQuery,
} from '../basket/basketApi';
import { ChangeEvent, useEffect, useState } from 'react';

export default function ProductDetails() {
  // useParams() is a hook from React router dom, from the current url
  // id is from useParams()
  const { id } = useParams();

  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  const { data: basket } = useFetchBasketQuery();
  const item = basket?.items.find((x) => x.productId === +id!);
  const [quantity, setQuantity] = useState(0);

  //useEffect is a Hook that lets you run some code whenever something changes (or when the component first renders).
  useEffect(() => {
    if (item) setQuantity(item.quantity);
  }, [item]);

  // const [product, setProduct] = useState<Product | null>(null);

  // useEffect(() => {
  //   fetch(`https://localhost:5001/api/products/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => setProduct(data))
  //     .catch((error) => console.log(error));
  // }, [id]);

  //useFetchProductDetailsQuery is a hook that was created in CatalogAPI
  //data : product renaming data into product
  // isLoading from the hook
  //id is a product id from the request useParams() hook from React router dom, from the current url
  //id? +id : 0, +id convert/cast a string to a number
  const { data: product, isLoading } = useFetchProductDetailsQuery(
    id ? +id : 0
  );

  if (!product || isLoading) return <div>Loading ...</div>;

  //functions to update the basket when adding/removing the quantity
  const handleUpdateBasket = () => {
    const updatedQuantity = item
      ? Math.abs(quantity - item.quantity)
      : quantity;
    if (!item || quantity > item.quantity) {
      addBasketItem({ product, quantity: updatedQuantity });
    } else {
      removeBasketItem({ productId: product.id, quantity: updatedQuantity });
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value; // + cast string value to a number

    if (value >= 0) setQuantity(value);
  };
  ///////////////////////////////////////////////////////////////////

  const productDetails = [
    { label: 'Name', value: product.name },
    { label: 'Description', value: product.description },
    { label: 'Type', value: product.type },
    { label: 'Brand', value: product.brand },
    { label: 'Quantity in stock', value: product.quantityInStock },
  ];
  return (
    <Grid2 container spacing={6} maxWidth="lg" sx={{ mx: 'auto' }}>
      <Grid2 size={6}>
        <img
          src={product?.pictureUrl}
          alt={product.name}
          style={{ width: '100%' }}
        />
      </Grid2>
      <Grid2 size={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table
            sx={{
              '& td': { fontSize: '1rem' },
            }}
          >
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    {detail.label}
                  </TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid2 container spacing={2} marginTop={3}>
          <Grid2 size={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in basket"
              fullWidth
              //defaultValue={1} // uncontrolled component
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <Button
              onClick={handleUpdateBasket}
              disabled={
                quantity === item?.quantity || (!item && quantity === 0)
              }
              sx={{ height: '55px' }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? 'Update quantity' : 'Add to basket'}
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
