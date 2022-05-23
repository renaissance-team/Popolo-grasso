import React from 'react';
import renderer from 'react-test-renderer';
import Button, {EButtonView} from '../Button';

describe('Button snapshots', () => {
  it('renders default button', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders whith children button', () => {
    const tree = renderer.create(<Button><span>Text</span></Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders submit button', () => {
    const tree = renderer.create(<Button type="submit" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders reset button', () => {
    const tree = renderer.create(<Button type="reset" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders transparent button', () => {
    const tree = renderer.create(<Button view={EButtonView.transparent} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
