import { Typography, Grid2 } from '@mui/material';
import { useFetchBasketQuery } from './basketApi';
import BasketItem from './BasketItem';
import OrderSummary from '../../app/shared/components/OrderSummary';

export default function BasketPage() {
  //when the page is loading it send request to the route in basketApi and get the status from the useFetchBasketQuery hook
  const { data, isLoading } = useFetchBasketQuery();

  if (isLoading) return <Typography>Loading basket...</Typography>;

  // if (!data || data.items.length === 0) return <Typography variant="h3">Your basket is empty</Typography>
  if (!data || data.items.length === 0)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <Grid2 container spacing={2}>
      {/* {data.basketId} */}
      <Grid2 size={8}>
        {data.items.map((item) => (
          <BasketItem item={item} key={item.productId} />
        ))}
      </Grid2>
      <Grid2 size={4}>
        <OrderSummary />
      </Grid2>
    </Grid2>
  );
}
