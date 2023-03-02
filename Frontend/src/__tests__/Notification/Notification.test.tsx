import React from 'react';
import renderer from 'react-test-renderer';
import Notification from '../../components/Notification';

it('Notification renders correctly', () => {
  const props = {
    isOpen: true,
    message: 'message',
    onClose: () => undefined,
  };

  const tree = renderer
    .create(<Notification {...props} />, {
      createNodeMock: (node) => {
        return document.createElement(node.type as string);
      },
    })
    .toJSON();
  expect(tree).toMatchSnapshot();
});
