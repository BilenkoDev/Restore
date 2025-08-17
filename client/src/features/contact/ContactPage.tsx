
//import { CounterState, decrement, increment } from './counterReducer';
//import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonGroup, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { decrement, increment } from './counterReducer';

export default function ContactPage() {
  //const data = useSelector((state: CounterState) => state.data);
  //const dispatch = useDispatch(); //function that sends an action to redux store
  
  const { data } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <>
      <Typography variant="h2">ContactPage</Typography>
      <Typography variant="body1">The data is: {data}</Typography>

      <ButtonGroup>
        {/* <Button onClick={() => dispatch({ type: 'decrement' })} color="error">
          decrement
        </Button>

        <Button
          onClick={() => dispatch({ type: 'increment' })}
          color="secondary"
        >
          incecrement
        </Button> */}

        <Button onClick={() => dispatch(decrement(1))} color="error">
          decrement
        </Button>
        <Button onClick={() => dispatch(increment(1))} color="secondary">
          increment
        </Button>
        <Button onClick={() => dispatch(increment(5))} color="primary">
          increment by 5
        </Button>
      </ButtonGroup>
    </>
  );
}
