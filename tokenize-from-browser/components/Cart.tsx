import { FC } from "react"
import { useCartState, StoreItemProps } from "../util/useCartState"
import Image from "next/image"
import styles from '../styles/Home.module.css'

const CartItem: FC<StoreItemProps> = (props: StoreItemProps) => {
  return (
    <Image src={`/plants/${props.itemnum}.jpg`} width={100} height={100} alt={`plant${props.itemnum}`} className={styles.card} />
  )
}

const Cart: FC<{}> = () => {
  const store = useCartState()
  return (
    <>
      {store.items.map(item => {
        return <CartItem itemnum={item.itemnum} price={0} />
      })}
    </>
  )

}

export default Cart
