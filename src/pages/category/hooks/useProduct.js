import { useEffect, useState } from 'react';
import { useProduct } from '../../../services';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const { productList } = useProduct();

  useEffect(() => {
    productList().then(res => {
      setProducts(res);
    });
  }, []);

  return { products };
};
