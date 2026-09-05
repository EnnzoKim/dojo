import { render, screen } from '@testing-library/react';
import {{COMPONENT}} from './{{COMPONENT}}';

describe('{{COMPONENT}}', () => {
  it('renders', () => {
    render(<{{COMPONENT}} />);
    expect(screen.getByText('{{COMPONENT}}')).toBeInTheDocument();
  });
});
