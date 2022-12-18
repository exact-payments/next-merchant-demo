import Image from 'next/image';
import { FC } from 'react';
import styles from '../styles/Home.module.css';
import { useCartState } from '../util/useCartState';

type StoreItemProps = {
  itemnum: string;

};
export const StoreItem: FC<StoreItemProps> = (props: StoreItemProps) => {
  const store = useCartState();
  const handleOnClick = () => {
    store.addItem(props.itemnum);
  };
  return (
    <Image src={`/plants/${props.itemnum}.jpg`} width={300} height={300} alt={`plant${props.itemnum}`} className={styles.card} onClick={handleOnClick} />
  );
};
export default StoreItem