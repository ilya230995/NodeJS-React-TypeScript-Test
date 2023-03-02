import React, { useEffect, useState, useMemo } from 'react';
import { v4 as generateID } from 'uuid';
import { useAppDispatch } from '../../hooks/useDispatch';
import { useAppSelector } from '../../hooks/useSelector';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { getCartList } from '../../Redux/cart/selectors';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProductOverview from '../../components/ProductOverview';
import AddToCartModal from '../../components/AddToCartModal';
import { fetchAllProducts } from '../../Redux/products/thunk';
import { getProductsList, getProductLoading } from '../../Redux/products/selectors';
import { actions as cartActions } from '../../Redux/cart/slice';
import { LoadingResultsT } from '../../types/loading';
import { ProductI } from '../../types/products';
import s from './CartPage.module.scss';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedProduct, setSelectedProduct] = useState<ProductI | null>(null);
  const cartList = useAppSelector((state) => getCartList(state));
  const productsList = useAppSelector((state) => getProductsList(state));
  const productsListLoading = useAppSelector((state) => getProductLoading(state));

  useEffect(() => {
    dispatch(fetchAllProducts({}));
  }, []);

  const handleRemoveClick = (id: string | undefined) => {
    if (id) {
      dispatch(cartActions.removeItem(id));
    }
  };

  const list = useMemo(() => {
    if (cartList && productsList) {
      return cartList.reduce<{ productList: ProductI[]; totalQuantity: 0 }>(
        (acc, item) => {
          const product = productsList.docs.find((product) => product._id === item.id);
          if (product) {
            const totalProductAmount = product.price * item.quantity;
            acc.productList.push({ ...product, quantity: item.quantity, totalAmount: totalProductAmount });
            acc.totalQuantity += totalProductAmount;
          }
          return acc;
        },
        {
          productList: [],
          totalQuantity: 0,
        },
      );
    }
  }, [cartList, productsList]);

  return (
    <div>
      {list && productsListLoading === LoadingResultsT.SUCCEEDED ? (
        <div>
          <p className={s.total}>{`Total amount: ${list.totalQuantity}`}</p>
          <ul className={s.productList}>
            {list.productList.map((product, index) => {
              return (
                <li key={generateID()} className={s.productItem}>
                  <p className={s.productTitle}>{`Product ${index + 1}`}</p>
                  <ProductOverview product={product as ProductI} />
                  <p className={s.quantity}>{`Quantity: ${product.quantity}`}</p>
                  <p className={s.quantity}>{`Total: ${product.totalAmount}`}</p>
                  <div className={s.iconBtnContainer}>
                    <Tooltip title="Edit quantity">
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => setSelectedProduct(product ? product : null)}
                      >
                        <ModeEditIcon fontSize="small" color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove">
                      <IconButton aria-label="delete" size="small" onClick={() => handleRemoveClick(product?._id)}>
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <LoadingSpinner center mt />
      )}
      <AddToCartModal isCartPage product={selectedProduct} handleClose={() => setSelectedProduct(null)} />
    </div>
  );
};

export default CartPage;
