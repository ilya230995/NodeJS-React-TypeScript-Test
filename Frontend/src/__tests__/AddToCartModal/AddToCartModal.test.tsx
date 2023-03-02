/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { createPortal } from 'react-dom';
import AddToCartModal from '../../components/AddToCartModal';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  return {
    ...original,
    createPortal: (node: React.ReactNode) => node,
  };
});
it('AddToCartModal renders correctly', () => {
  const props = {
    handleClose: () => undefined,
    product: {
      _id: '63fe669123a5df8218be030b',
      name: 'Orange',
      category: 'fruits',
      price: 5,
      description: 'Orange',
      createdAt: '2023-02-28T20:39:45.743Z',
      updatedAt: '2023-02-28T20:43:17.802Z',
    },
  };

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  const initialState = {};
  const mockedStore = mockStore(initialState);

  interface PortalI {
    children: JSX.Element;
  }

  const Portal: React.FC<PortalI> = ({ children }) => {
    const myRef = React.createRef<HTMLBodyElement>();
    return <body ref={myRef}>{createPortal(children, myRef.current as HTMLBodyElement)}</body>;
  };

  const tree = renderer
    .create(
      <Provider store={mockedStore}>
        <Portal>
          <AddToCartModal {...props} />
        </Portal>
      </Provider>,
      {
        createNodeMock: (node) => {
          return document.createElement(node.type as string);
        },
      },
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
