import { useState } from "react"
import { useCartState } from "../util/useCartState"

const OrderTotal = () => {
    const items = useCartState().items


    const getFormattedPrice = () => {
        return "$" + (items.length*10) + ".00"
    }

    return (<h3>Your Order Total: {getFormattedPrice()}</h3>)
}

export default OrderTotal