import { useCartState } from '../util/useCartState'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import Switch from 'react-switch'

const CheckoutButton  = () => {
    const store = useCartState()
    const isEmpty = store.items.length == 0
  const [altCheckoutSelected, setAltCheckoutSelected] = useState(false);

    return (
      isEmpty ? <></> : <>
      <div className={styles.switch}>
          <Switch checked={altCheckoutSelected} onChange={setAltCheckoutSelected} onColor='#7ac833' offColor= '#000000' activeBoxShadow='7ac833' uncheckedIcon={false} checkedIcon={false}/>
          <p className={altCheckoutSelected ? styles.switchlabelgreen :'' }>Alternate Checkout UI</p>
      </div>
      <Link href= {altCheckoutSelected ? 'checkout2' : 'checkout'} className={styles.card}>Checkout</Link>
      </>
    )
  }
export default CheckoutButton  