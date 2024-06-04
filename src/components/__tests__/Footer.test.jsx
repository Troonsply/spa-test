import {screen,render} from '@testing-library/react';
import { Footer } from '../Footer';


describe('Footer', () => {
  it('renders correctly', () => {
    render(<Footer/>);
    expect(screen.getByText(/Copyright Text/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toBeInTheDocument();
  });
})