import styles from '../styles/Home.module.css'

const Disclaimer = () => {
  return (
    <div className={styles.checkoutdisclaimer}>
      <h1>Demonstration only.</h1>
      <h2>Payments are simulated and no actual funds are transferred.</h2>
      <h2><a href="https://developer.exactpay.com/docs/Sandbox-Test-Cards" target="_blank">TEST CARDS</a></h2>
    </div>
  )
};

export default Disclaimer
