import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useDispatch';
import { Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@mui/material';
import { actions as cartActions } from '../../Redux/cart/slice';
import { ProductI } from '../../types/products';
import s from './AddToCartModal.module.scss';

interface AddToCartModalI {
  product: ProductI | null;
  handleClose: () => void;
  isCartPage?: boolean;
}

const AddToCartModal: React.FC<AddToCartModalI> = ({ product, handleClose, isCartPage }) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product?.quantity) {
      setQuantity(product?.quantity);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (isCartPage) {
      dispatch(
        cartActions.updateQuantity({
          id: product?._id,
          quantity,
        }),
      );
    } else {
      dispatch(
        cartActions.setNewItem({
          id: product?._id,
          quantity,
        }),
      );
    }
    handleClose();
  };

  return (
    <Modal open={!!product} onClose={handleClose}>
      <div className={s.contentWrapper}>
        <div className={s.modalContent}>
          <p>{`Choose quantity for ${product?.name}:`}</p>
          <div className={s.quantityContainer}>
            <Button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)} sx={{ marginRight: '5px' }}>
              <RemoveIcon />
            </Button>
            <div className={s.quantityNumber}>
              <p>{quantity}</p>
            </div>
            <Button onClick={() => setQuantity(quantity + 1)} sx={{ marginLeft: '5px' }}>
              <AddIcon />
            </Button>
          </div>
          <div className={s.submitButton}>
            <Button variant="contained" color="error" onClick={handleClose} sx={{ marginRight: '20px' }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddToCartModal;
