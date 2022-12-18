# Plant Shop Template (no ExactJS)
This is a template app for Exact's Plant Shop allowing users to add plants to a cart and proceed to a checkout page. The checkout page displays a form with no card section- that displays a not implemented page if they attempt to checkout.


You can view a demo of this application running at: 
https://noexactjs-demo.merchant-portal.one/


## Running the Application
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About the Application
### This application is built with nextJS 

`pages/api/` runs on the backend

 `pages/` runs in the browser

 `components/` contains react components

 `util/` contains utility functions used by components

 `public/` provides static public assets (images in this case)

 `styles/` provides css styles to be imported


### `pages/`
#### `index.tsx`
A straightforward landing page:

- displays a header & copy
- displays a grid of `StoreItems`
- displays a `Cart` containing `StoreItems`
- displays a checkout button
- displays a clear cart button

#### `checkout.tsx`
A straightforward form

The form is not connected to anything in this project, see p1-complete or p2-complete for implementation

#### `_app.tsx`
Used by nextJS to package and create our application

### `api/`
The api is not implemented, see p1-complete or p2-complete for implementation


### `components/`
#### `Cart.tsx`
Uses `cartState()` to return a display of each item in the cart

#### `CheckoutButton.tsx`
Uses `cartState()` to determine if the cart has items, if it does it displays a link to `/checkout/`

#### `ClearCartButton.tsx`
Uses `cartState()` to determine if the cart has items, if it does it provides the a button to clear it.

#### `OrderTotal.tsx`
Uses `cartState()` to determine the current value of cart items and displays that in format $XX.xx.

#### `StoreItem.tsx`
An item in the store is represented as an image. If the item is clicked it is added to the cart.

### `utils/`
#### `useCartState.tsx`
A [zustand](https://www.npmjs.com/package/zustand) store that tracks cart state throughout the app.

Provides a list of items in the cart, an `addItem()` function and a `removeAllItems()` function