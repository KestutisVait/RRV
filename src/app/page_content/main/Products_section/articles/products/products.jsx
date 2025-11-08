'use client'

import { useState, useEffect } from 'react'
import ProductInfo from './product_info'
import Carousell from '@/components/carousel/carousel'
import StripedSVGPattern from '@/components/striped_BG'
import { useProducts } from '@/context/ProductsContext'
import styles from './products.module.css'

export default function Products() {
  const [showProductInfo, setShowProductInfo] = useState(false)
  const { dataProducts, activeCardIndex } = useProducts()

  // watch for browser back/forward
  useEffect(() => {
    const handlePop = () => {
      const params = new URLSearchParams(window.location.search)
      const view = params.get('view')
      setShowProductInfo(view === 'info')
    }

    window.addEventListener('popstate', handlePop)
    handlePop() // run once on mount

    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  const openInfo = () => {
    const url = new URL(window.location)
    url.searchParams.set('view', 'info')
    window.history.pushState({}, '', url)
    setShowProductInfo(true)
  }

  const closeInfo = () => {
    setShowProductInfo(false) // hide first
    const url = new URL(window.location)
    url.searchParams.delete('view')
    window.history.pushState({}, '', url)
  }

  return (
    <article className={styles.wrapper}>
      {!showProductInfo && (
        <Carousell
          direction="left"
          cardData={dataProducts}
          infoPageMode={openInfo}
        />
      )}

      {showProductInfo && (
        <ProductInfo
          data={dataProducts[activeCardIndex]}
          onClose={closeInfo}
        />
      )}

      <StripedSVGPattern
        angle={210}
        stripeColor="rgba(4, 38, 1, 0.2)"
        stripeThickness={1}
        gap={5}
        width={100}
        height={700}
        fadeHeight={100}
      />
    </article>
  )
}
