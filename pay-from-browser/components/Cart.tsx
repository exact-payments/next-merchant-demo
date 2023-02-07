import { FC } from "react"
import { useCartState } from "../util/useCartState"
import Image from "next/image"
import styles from '../styles/Home.module.css'

type CartItemProps = {
    itemnum: string
  
  }

const CartItem : FC<CartItemProps> = (props : CartItemProps) => {
  return(
    <Image src={`/plants/${props.itemnum}.jpg`} width={100} height={100} alt= {`plant${props.itemnum}`} className={styles.card} />
  )
}

const Cart : FC<{}> = () => {
  const store = useCartState()
    return (
      <>
      {store.items.map(item => {
        return <CartItem itemnum={item} key={Math.random()}/>
      })}
      
      </>
    )
  
}

export default Cart