import { useCartState } from '../util/useCartState'
import styles from '../styles/Home.module.css'
import { FC } from 'react'

const ClearCartButton : FC<{}> = () => {
    const store = useCartState()
    const isEmpty = store.items.length == 0
    return (
      isEmpty ? <></> : <button onClick= {store.removeAllItems} className={styles.card}>Clear Cart</button>
    )
  }
export default ClearCartButton  