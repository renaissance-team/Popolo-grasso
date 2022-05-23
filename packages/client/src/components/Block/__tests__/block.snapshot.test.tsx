import React from 'react';
import renderer from 'react-test-renderer';
import Block from '../Block';

describe('Block snapshots', () => {
  it('renders default block', () => {
    const tree = renderer.create(<Block title="title" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders block whith children', () => {
    const tree = renderer.create(<Block title="title"><span>Text</span></Block>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
