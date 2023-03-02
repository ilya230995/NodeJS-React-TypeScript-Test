import React from 'react';
import { ProductI } from '../../types/products';
import { Divider } from '@mui/material';
import s from './ProductOverview.module.scss';

interface ProductOverviewI {
  product: ProductI;
}

const ProductOverview: React.FC<ProductOverviewI> = ({ product }) => {
  return (
    <div className={s.product}>
      <p className={s.productItem}>{`Name: ${product?.name}`}</p>
      <Divider />
      <p className={s.productItem}>{`Category: ${product?.category}`}</p>
      <Divider />
      <p className={s.productItem}>{`Price: ${product?.price}`}</p>
      <Divider />
      <p className={s.productItem}>{`Description: ${product?.description}`}</p>
      <Divider />
    </div>
  );
};

export default ProductOverview;
