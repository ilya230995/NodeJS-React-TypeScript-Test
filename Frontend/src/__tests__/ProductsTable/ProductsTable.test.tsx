import React from 'react';
import renderer from 'react-test-renderer';
import ProductsTable from '../../components/ProductsTable';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

it('ProductsTable renders correctly', () => {
  const props = {
    productsList: [
      {
        _id: '63fe669123a5df8218be030b8734yr3847',
        name: 'Orange',
        category: 'fruits',
        price: 5,
        description: 'Orange',
        createdAt: '2023-02-28T20:39:45.743Z',
        updatedAt: '2023-02-28T20:43:17.802Z',
      },
    ],
  };
  const mockStore = configureStore();
  const initialState = {
    cart: { cartList: [{ id: '63fe669123a5df8218be030b8734yr3847', quantity: 1 }] },
  };
  const mockedStore = mockStore(initialState);

  const tree = renderer
    .create(
      <Provider store={mockedStore}>
        <Router>
          <ProductsTable {...props} />
        </Router>
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
