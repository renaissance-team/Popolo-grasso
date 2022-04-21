import React, {InputHTMLAttributes} from 'react';
import {render, RenderResult, screen} from '@testing-library/react';

import Input, {IInputProps} from '../Input';

describe('Input', () => {
  function renderInput(props: IInputProps = {}): RenderResult {
    return render(<Input {...props} />);
  }

  it('should render default input', () => {
    const {container} = renderInput({value: 'value', label: 'label'});
    expect(screen.queryByDisplayValue('value')).toBeInTheDocument();
    expect(screen.queryByText('label')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('wrapper');
    expect(container.childNodes.length).toBe(1);
    expect(container.firstChild?.childNodes.length).toBe(2);
  });

  it('should render input with error', () => {
    const {container} = renderInput({errorText: 'error'});
    expect(screen.queryByText('error')).toBeInTheDocument();
    expect(container.firstChild?.firstChild).toHaveClass('inputHasError');
    expect(container.firstChild?.lastChild).toHaveClass('errorText');
  });

  it('should add custom class name to the input', () => {
    const {container} = renderInput({className: 'custom-class'});
    const input = container.firstChild;
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('custom-class');
    expect(input).toHaveClass('wrapper');
  });

  it('should render input with custom type', () => {
    renderInput({value: 'value', type: 'email'});
    const input = screen.queryByDisplayValue('value');
    expect(input).toBeInTheDocument();
    expect((input as unknown as InputHTMLAttributes<HTMLInputElement>).type).toBe('email');
  });
});
