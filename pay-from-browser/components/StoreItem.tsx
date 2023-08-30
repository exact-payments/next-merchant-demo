import Image from 'next/image';
import { FC } from 'react';
import styles from '../styles/Home.module.css';
import { useCartState, StoreItemProps } from '../util/useCartState';

export const StoreItem: FC<StoreItemProps> = (props: StoreItemProps) => {
  const store = useCartState();
  const handleOnClick = () => {
    store.addItem(props);
  };
  return (
    <div className={styles.card}>
      <Image src={`/plants/${props.itemnum}.jpg`} width={250} height={250} alt={`plant${props.itemnum}`} onClick={handleOnClick} />
      $ {props.price / 100}
    </div>
  );
};
export default StoreItem
