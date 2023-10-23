# ExactJS Plant Shop
This is a template app for Exact's Plant Shop allowing users to add plants to a cart and proceed to a checkout page. 
The checkout page displays a form which uses ExactJS, the payments are made directly in the browser.

You can view a demo of this application running at: 
https://merchant-demo.plant-shop.co/

## Running the Application
### Environment
This program requires a `.env.local` with the following: 
- P2_ACCOUNT_ID: Your Account ID
- APPLICATION_TOKEN: An application token generated for the Exact Payments API
- NEXT_PUBLIC_P2_DOMAIN: The P2 domain to which API requests should be sent (do not include scheme - HTTPS is mandatory!!), eg: api.exactpaysandbox.com
- NEXT_PUBLIC_BASE_URL: set to `http://localhost:3000` for local development- something else if you are deploying somewhere.

Run the following to start a development instance of the app.
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
- displays a switch to select between checkout pages
- displays a checkout button
- displays a clear cart button

#### `checkout.tsx`
Displays a form with ExactJS card payments integration.

##### Checkout()
We begin by initializing our items an create a variable `exact` to be assigned on Script Load. We hide our form while ExactJS loads, and display a loading icon.

##### onExactJSReady()
This function is called after ExactJS is loaded. This is executed when a user goes the checkout page, before a user actually pays.

We send a POST to the backend with our order price.

Our backend communicates with the Exact Payments Sandbox and responds with a Order access token,used to initialize ExactJS, and a unique orderId referencing the order we just created.

We initialize ExactJS using the access token and assign it to variable `exact`.

We add the Card Component to an empty div called `cardElement`, which now displays a secure card entry form.

We then update the CSS to display our form and hide our loading icon after waiting 600ms to minimize pop-in.

##### handleSubmit(event)
Called by our form when submitted.

We first intercept the event by calling `preventDefault()`.

We then call `exact.payOrder()` which returns a Promise with a `payment_id`.

`payment_id` is appended to the form and then submitted.

##### return
We are loading ExactJS here via a `<Script>` tag, and calling `onExactJSReady()` on script load.

We display a loading icon, to dissapear after ExactJS loads.

We display a form with sections for email address, street address, apartment, city, province, postal code. The form is initially hidden.

The form calls `handleSubmit()` when submitted and `api/receivePaymentId` when the payment is completed.

##### router + useEffect
We send the user back to the index page if they are in an illegal state for checkout (no items in cart -> no totalPrice to send to ExactJS)

#### `checkout2.tsx`
A copy of the checkout page, but with a bullet ui created by setting individual elements.

#### `paid.tsx`
A straightforward post-payment screen.

**OPTIONAL:**

For the purpose of demonstration we render payment information by making an api call to `api/demoPaymentInformation`.

We do this dynamically with `ssr:false` to avoid issues with hydration due to the crude nature of this implementation

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

For the purpose of this demo, we save `paymentInfo` to an environment variable, so we can display it with `api/demoPaymentInformation`

We print payment object to indicate that the payment has succesfully been processed.

We redirect the user to the `/paid` page

#### `displayPaymentInformation.ts`
**NOTE: This function is completely present ONLY for demonstration purposes and COMPLETELY OPTIONAL**

This method and functionality is provided as a simple way of viewing payment information in the browser.
Do not display this information to the customer post payment.
Do not use an environment variable and instead use a secure database to store payment information.

We use the most recent value of `paymentInfo` sent to the server to make a GET request to [`account/{accountId}/payments/{paymentId}`] (https://developer.exactpay.com/api#/paths/account-accountId--payments--paymentId/get)

### `components/`
#### `Cart.tsx`
Uses `cartState()` to return a display of each item in the cart.

#### `CheckoutButton.tsx`
Uses `cartState()` to determine if the cart has items, if it does it displays a link to `/checkout/` or `/checkout2/` depending on Switch state

#### `ClearCartButton.tsx`
Uses `cartState()` to determine if the cart has items, if it does it provides the a button to clear it.

#### `OrderTotal.tsx`
Uses `cartState()` to determine the current value of cart items and displays that in format $XX.xx.

#### `PaymentInfoBox.tsx`
Makes a call to `api/demoPaymentInformation` to display payment information for the purpose of this demo.

#### `StoreItem.tsx`
An item in the store is represented as an image. If the item is clicked it is added to the cart.
### `utils/`
#### `useCartState.tsx`
A [zustand](https://www.npmjs.com/package/zustand) store that tracks cart state throughout the app.

Provides a list of items in the cart, an `addItem()` function and a `removeAllItems()` function.
