import {screen, render} from '@testing-library/react';
import { Search } from '../Search';
import { userEvent } from '@testing-library/user-event';

describe('Search', () => {
  it('renders correctly', () => {
    render(<Search/>);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('should handle input change', async () => {
    render(<Search />);
    const input = screen.getByRole('searchbox');
   await userEvent.type(input, 'test');
    expect(input).toHaveValue('test');
  });
  it('should handle submit', async () => {
    const cb = jest.fn();
    render(<Search cb={cb} />);
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button');
    await userEvent.type(input, 'test');
    await userEvent.click(button);
    expect(cb).toHaveBeenCalledWith('test');
  });
  it('should handle submit with enter', async () => {
    const cb = jest.fn();
    render(<Search cb={cb} />);
    const input = screen.getByRole('searchbox');
    await userEvent.type(input, 'test{enter}');
    // await userEvent.keyboard('{enter}');
    expect(cb).toHaveBeenCalledWith('test');
  });
})