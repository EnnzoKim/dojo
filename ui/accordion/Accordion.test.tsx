import { render, screen } from '@testing-library/react';
import Accordion from './Accordion';

describe('Accordion', () => {
  it('renders', () => {
    render(<Accordion />);
    expect(screen.getByText('Accordion')).toBeInTheDocument();
  });
});
