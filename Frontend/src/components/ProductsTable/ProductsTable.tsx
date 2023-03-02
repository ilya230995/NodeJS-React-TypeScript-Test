import React, { useState } from 'react';
import { v4 as generateID } from 'uuid';
import { useAppSelector } from '../../hooks/useSelector';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AddToCartModal from '../../components/AddToCartModal';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import { getCartList } from '../../Redux/cart/selectors';
import { ProductI } from '../../types/products';
import { routes } from '../../app/routes';
import s from './ProductsTable.module.scss';

interface ProductsTableI {
  productsList: ProductI[];
}

const ProductsTable: React.FC<ProductsTableI> = ({ productsList }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductI | null>(null);
  const cartList = useAppSelector((state) => getCartList(state));
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Add to Cart</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!productsList &&
              productsList.map((product) => (
                <TableRow key={generateID()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Link to={`${routes.product}/${product._id}`} className={s.productLink}>
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>
                    <div className={s.cartCell}>
                      <Button onClick={() => setSelectedProduct(product)}>
                        <AddIcon />
                      </Button>
                      {!!cartList.length && cartList.some((item) => item.id === product._id) && (
                        <div>
                          <DoneIcon color="success" fontSize="small" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddToCartModal product={selectedProduct} handleClose={() => setSelectedProduct(null)} />
    </>
  );
};

export default ProductsTable;
