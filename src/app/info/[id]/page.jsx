'use client';
import { use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ProductProvider } from "@/context/ProductsContext";
import { useProducts } from '@/context/ProductsContext'

export default function ProductInfoPage({ params }) {

  const {id} = use(params);

  // const { dataProducts, activeCardIndex } = useProducts()

  // console.log(dataProducts);
  

  // if (!dataProducts || dataProducts.length === 0) return null

  return (
    <ProductProvider>
      <ProductInfo index={id}/>
    </ProductProvider>
  ) 
  
  
  function ProductInfo({ index }) {
  const { dataProducts } = useProducts();
  const router = useRouter();

  if (!dataProducts || dataProducts.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <button onClick={() => router.back()}>
        Go Back
      </button>

      <div>{dataProducts[index].shortInfo}</div>

      <Image
        src={dataProducts[index].poster}
        width={400}
        height={400}
        alt="poster"
      />
    </div>
  );
}
    
}