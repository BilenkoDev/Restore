import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from '../../app/api/baseApi';
import { Basket, Item } from '../../app/models/basket';
import { Product } from '../../app/models/product';
// import { Product } from "../../app/models/product";

//returns Product or, product is Item
function isBasketItem(product: Product | Item): product is Item {
  return (product as Item).quantity !== undefined;
}

export const basketApi = createApi({
  reducerPath: 'basketApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Basket'],
  endpoints: (builder) => ({
    fetchBasket: builder.query<Basket, void>({
      query: () => 'basket',
      providesTags: ['Basket'],
    }),
    addBasketItem: builder.mutation<
      Basket,
      { product: Product | Item; quantity: number }
    >({
      // query: ({ product, quantity }) => ({
      //         url: `basket?productId=${product.id}&quantity=${quantity}`,
      //         method: 'POST'
      //     }),

      query: ({ product, quantity }) => {
        const productId = isBasketItem(product)
          ? product.productId
          : product.id;
        return {
          url: `basket?productId=${productId}&quantity=${quantity}`,
          method: 'POST',
        };
      },

      //add this section to invalidateTags(['Basket'])) to fetch the updates, not from cache
      onQueryStarted: async (
        { product, quantity },
        { dispatch, queryFulfilled }
      ) => {
        let isNewBasket = false;

        const patchResult = dispatch(
          //Update the cached result of fetchBasket in the store immediately (optimistic update), even before the server confirms it.”
          //draft is the basket state.
          basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
            const productId = isBasketItem(product)
              ? product.productId
              : product.id;

            if (!draft?.basketId) isNewBasket = true;

            if (!isNewBasket) {
              const existingItem = draft.items.find(
                (item) => item.productId === productId
              );
              if (existingItem) existingItem.quantity += quantity;
              // this scenario works from the catalog component to add a product to the basket
              // using new Item(product, quantity)
              // no scenario to use the basket item component with  -/+ to add a new basket item
              else
                draft.items.push(
                  // isBasketItem(product) ? product : new Item(product, quantity)

                  //{...product, productId: product.id, quantity} - The spread operator (...) copies
                  // all the properties of product into a new object.
                  // Adds a new property called productId and sets it equal to product.id.
                  // Adds another property named quantity with the value from the variable quantity.
                  isBasketItem(product)
                    ? product
                    : { ...product, productId: product.id, quantity }
                );
            }
          })
        );

        try {
          await queryFulfilled;

          //dispatch(basketApi.util.invalidateTags(['Basket']));
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),

    removeBasketItem: builder.mutation<
      Basket,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `basket?productId=${productId}&quantity=${quantity}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          //Update the cached result of fetchBasket in the store immediately (optimistic update), even before the server confirms it.”
          basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
            const itemIndex = draft.items.findIndex(
              (item) => item.productId === productId
            );
            if (itemIndex >= 0) {
              draft.items[itemIndex].quantity -= quantity;
              if (draft.items[itemIndex].quantity <= 0) {
                draft.items.splice(itemIndex, 1);
              }
            }
          })
        );

        try {
          await queryFulfilled;

          //dispatch(basketApi.util.invalidateTags(['Basket']));
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useFetchBasketQuery,
  useAddBasketItemMutation,
  useRemoveBasketItemMutation,
} = basketApi;
