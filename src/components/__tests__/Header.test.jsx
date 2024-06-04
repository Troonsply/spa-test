import {screen} from '@testing-library/react';
import {renderWithRouter} from '../../utils/testing.js';
import { Header } from '../Header';


describe('Header', () => {
  it('renders correctly', () => {
    renderWithRouter(<Header/>);
    expect(screen.getByText(/react food/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });
})