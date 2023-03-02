import React from 'react';
import renderer from 'react-test-renderer';
import ProductOverview from '../../components/ProductOverview';

it('ProductOverview renders correctly', () => {
  const props = {
    product: {
      _id: '63fe669123a5df8218be030b8734yr3847',
      name: 'Orange',
      category: 'fruits',
      price: 5,
      description: 'Orange',
      createdAt: '2023-02-28T20:39:45.743Z',
      updatedAt: '2023-02-28T20:43:17.802Z',
    },
  };

  const tree = renderer.create(<ProductOverview {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
