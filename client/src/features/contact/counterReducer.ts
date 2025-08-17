//using Redux ToolKit for reducer
//configuring in the store, main and using on the contact page
import { createSlice } from '@reduxjs/toolkit';

//store for a Counter
export type CounterState = {
  data: number;
};

//state
const initialState: CounterState = {
  data: 42,
};

//createSlice from redux ToolKit
export const counterSlice = createSlice({
  name: 'counter', //slice name
  initialState,
  reducers: {
    increment: (state, action) => {
      state.data += action.payload;
    },
    decrement: (state, action) => {
      state.data -= action.payload;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

// 2 //////////////////////
// export function incrementLegacy(amount = 1) {
//   return {
//     type: 'increment',
//     payload: amount,
//   };
// }

// export function decrementLegacy(amount = 1) {
//   return {
//     type: 'decrement',
//     payload: amount,
//   };
// }

// export default function counterReducer(
//   state = initialState,
//   action: { type: string; payload: number }
// ) {
//   switch (action.type) {
//     case 'increment':
//       return {
//         ...state,
//         data: state.data + action.payload,
//       };
//     case 'decrement':
//       return {
//         ...state,
//         data: state.data - action.payload,
//       };
//     default:
//       // break;
//       return state;
//   }
// }
// 2 ////////////////////////////////////////////

// 1. reducer function is just a function in Redux that manages a piece of the global state.
//   export default function counterReducer(state = initialState, action: {type: string}) {
//     switch (action.type) {
//       case 'increment':
//         return {
//           ...state,
//           data: state.data + 1
//         };
//       case 'decrement':
//         return {
//           ...state,
//           data: state.data - 1
//         };
//       default:
//         // break;
//         return state;
//     }
// }
