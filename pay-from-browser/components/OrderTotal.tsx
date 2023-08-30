import { StoreItemProps, useCartState } from "../util/useCartState"

export const totalPrice = (items: StoreItemProps[]) => {
  return items.map(x => x.price).reduce((acc, cur) => acc + cur, 0)
}

export const OrderTotal = () => {
  const items = useCartState().items

  const getFormattedPrice = () => {
    return "$" + (totalPrice(items) / 100)
  }

  return (<h3>Your Order Total: {getFormattedPrice()}</h3>)
}

export default OrderTotal
