'use client'

import styles from './product_info.module.css'

export default function ProductInfo({ data, onClose }) {
  return (
    <div className={styles.wrapper}>
      <button onClick={onClose}>← Back</button>
      <h2>{data?.shortInfo ?? 'Product Title'}</h2>
      <p>Product details go here.</p>
    </div>
  )
}
