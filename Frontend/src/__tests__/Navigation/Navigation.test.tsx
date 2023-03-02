import React from 'react';
import renderer from 'react-test-renderer';
import Navigation from '../../components/Navigation';
import { BrowserRouter as Router } from 'react-router-dom';

it('Navigation renders correctly', () => {
  const props = {};

  const tree = renderer
    .create(
      <Router>
        <Navigation {...props} />
      </Router>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
