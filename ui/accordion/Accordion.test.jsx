import { render, screen } from '@testing-library/react';
import Accordion from './Accordion';

describe('Accordion', () => {
  test('renders', () => {
    render(<Accordion />);
    expect(screen.getByText('Accordion')).toBeInTheDocument();
  });
});
