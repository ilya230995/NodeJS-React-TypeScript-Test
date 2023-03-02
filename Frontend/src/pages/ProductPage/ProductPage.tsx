import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useDispatch';
import { useAppSelector } from '../../hooks/useSelector';
import { Button, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import ProductOverview from '../../components/ProductOverview';
import LoadingSpinner from '../../components/LoadingSpinner';
import AddToCartModal from '../../components/AddToCartModal';
import { fetchProductById } from '../../Redux/products/thunk';
import { getSelectedProduct, getProductLoading } from '../../Redux/products/selectors';
import { getCartList } from '../../Redux/cart/selectors';
import { LoadingResultsT } from '../../types/loading';
import s from './ProductPage.module.scss';

const ProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const selectedProduct = useAppSelector((state) => getSelectedProduct(state));
  const selectedProductLoading = useAppSelector((state) => getProductLoading(state));
  const cartList = useAppSelector((state) => getCartList(state));

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [productId, dispatch]);

  return (
    <div className={s.container}>
      <div className={s.productContainer}>
        <div className={s.titleContainer}>
          <h2>Product overview</h2>
          {!!cartList.length && cartList.some((item) => item.id === selectedProduct?._id) && (
            <div>
              <Tooltip title="Already in the cart">
                <DoneIcon color="success" fontSize="small" />
              </Tooltip>
            </div>
          )}
        </div>
        {selectedProductLoading === LoadingResultsT.SUCCEEDED && selectedProduct ? (
          <div>
            <ProductOverview product={selectedProduct} />
            <div className={s.iconButton}>
              <Tooltip title="Add to cart">
                <IconButton aria-label="delete" size="large" onClick={() => setOpenModal(true)}>
                  <AddIcon fontSize="large" color="primary" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ) : (
          <LoadingSpinner center mt />
        )}
      </div>
      <div>
        <Button variant="outlined" onClick={() => navigate(-1)} className={s.goBackBtn}>
          Go Back
        </Button>
      </div>
      <AddToCartModal
        product={openModal && selectedProduct ? selectedProduct : null}
        handleClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default ProductPage;
