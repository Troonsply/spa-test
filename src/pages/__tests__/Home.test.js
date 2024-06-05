import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import * as api from '../../api';
import { Home } from '../Home';
import { renderWithRouter } from '../../utils/testing';
import { userEvent } from '@testing-library/user-event';

const apiSpy = jest.spyOn(api, 'getAllCategories');

const categories = [
  {
    idCategory: '1',
    strCategory: 'Category1',
    strCategoryThumb: 'Category1Thumb',
    strCategoryDescription: 'Category1Description',
  },
  {
    idCategory: '2',
    strCategory: 'Category2',
    strCategoryThumb: 'Category2Thumb',
    strCategoryDescription: 'Category2Description',
  },
  {
    idCategory: '3',
    strCategory: 'Category3',
    strCategoryThumb: 'Category3Thumb',
    strCategoryDescription: 'Category3Description',
  },
];

describe('Home',  () => {
  it('should render Home', async () => {
    apiSpy.mockResolvedValueOnce({ categories });
    renderWithRouter(<Home />);
    const preloader = screen.getByRole('progressbar');
    expect(preloader).toBeInTheDocument();
    await waitForElementToBeRemoved(preloader);
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });
  it('should render Home with search', async () => {
    apiSpy.mockResolvedValueOnce({ categories });
    renderWithRouter(<Home />, {initialEntries: ['/?search=Category1']});
    const preloader = screen.getByRole('progressbar');
    expect(preloader).toBeInTheDocument();
    await waitForElementToBeRemoved(preloader);
    expect(screen.getAllByRole('article')).toHaveLength(1);
  })
  it('should render Home with search user interaction', async () => {
    apiSpy.mockResolvedValue({ categories });
    renderWithRouter(<Home />);

    const preloader = screen.getByRole('progressbar');
    const input = screen.getByRole('searchbox');

    expect(preloader).toBeInTheDocument();
    await waitForElementToBeRemoved(preloader);
    expect(screen.getAllByRole('article')).toHaveLength(3);

    await userEvent.type(input, 'Category1');
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getAllByRole('article')).toHaveLength(1);
  })
});