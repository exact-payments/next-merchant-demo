## Merchant Demo (Payment Gateway)
This is a template app for Exact's Plant Shop allowing users to add plants to a cart and proceed to a checkout page. 
The checkout page displays a form which uses ExactJS, the payments are then routed through Exact Payments Payment Gateway

## Running the Application
### Environment
This program requires a `.env.local` with the following: 
- P1_API_KEY: if you do not have this please speak with sales or visit https://provisioning.exactpaysandbox.com/signup
- P1_GATEWAY_ID: this can be found by going to https://admin.exactpaysandbox.com/terminal under the **Gateway** column
- NEXT_PUBLIC_BASE_URL: set to `http://localhost:3000` for local development- something else if you are deploying somewhere.
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
- displays a `Cart` instance containing `StoreItems`
- displays a checkout button

#### `checkout.tsx`
Displays a form with ExactJS card payments integration.

##### TypeScript Declarations
The file begins with `global` declaration for ExactJS to work with TypeScript, as well as type and interface declarations for ExactJS since we are loading it via a `<Script>` tag.

##### Checkout()
The rest of the logic is inside of the `Checkout()` , we begin by initializing our items an create a variable `exact` to be assigned on Script Load.

##### onExactJSReady()
This function is called after ExactJS is loaded. This is executed when a user goes the checkout page, before a user actually pays.

We send a POST to the backend with our order price.

Our backend communicates with the Exact Payments Sandbox and responds with a Order access token,used to initialize ExactJS, and a unique orderId referencing the order we just created.

We initialize ExactJS using the access token and assign it to variable `exact`.

We add the Card Component to an empty div called `cardElement`, which now displays a secure card entry form.

##### handleSubmit(event)
Called by our form when submitted.

We first intercept the event by calling `preventDefault()`.

We then call `exact.payOrder()` which returns a Promise with a `payment_id`.

`payment_id` is appended to the form and then submitted.

##### return
We are loading ExactJS here via a `<Script>` tag, and calling `onExactJSReady()` on script load.

We display a form with sections for email address, street address, apartment, city, province, postal code.

The form calls `handleSubmit()` when submitted and `api/receivePaymentId` when the payment is completed.

#### `paid.tsx`
A straightforward post-payment screen.

#### `_app.tsx`
Used by nextJS to package and create our application.

### `api/`
#### `postOrders.ts`
Receives a request containing the Order Amount from the browser when ExactJS is initialized by the checkout page. 

Sends a call to the Exact Pay Sandbox Orders API to create a new order for the given amount, using the terminal provided in `.env.local`.

Receives the response from the Exact API and if there is no error, returns the access token and orderId

#### `receivePaymentId.ts`
Called after a succesful payment is submitted to the Exact Pay Sandbox Payments API. 

This is a placeholder function, you may want to save the payment to your server, or do some other post-payment backend action.

We print payment object to indicate that the payment has succesfully been processed.

We redirect the user to the `/paid` page

### `components/`
#### `Cart.tsx`
Uses `cartState()` to return a display of each item in the cart.

#### `CheckoutButton.tsx`
Uses `cartState()` to determine if the cart has items, if it does it displays a link to `/checkout/`.

#### `StoreItem.tsx`
An item in the store is represented as an image. If the item is clicked it is added to the `cartState()`.
### `utils/`
#### `useCartState.tsx`
A [zustand](https://www.npmjs.com/package/zustand) store that tracks cart state throughout the app.

Provides a list of items in the cart, an `addItem()` function and a `removeAllItems()` function.