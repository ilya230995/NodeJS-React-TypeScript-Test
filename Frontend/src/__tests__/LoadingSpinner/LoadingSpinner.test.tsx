import React from 'react';
import renderer from 'react-test-renderer';
import LoadingSpinner from '../../components/LoadingSpinner';

it('LoadingSpinner renders correctly', () => {
  const props = {
    center: true,
    mt: true,
  };

  const tree = renderer.create(<LoadingSpinner {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
