import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import * as api from '../../api';
import { Category } from '../Category';
import { renderWithRouter } from '../../utils/testing';

const apiSpy = jest.spyOn(api, 'getFilteredCategory');

describe('Category', () => {
  it('should render correctly', async () => {
    apiSpy.mockResolvedValueOnce({
      meals: [{
        idMeal: '1',
        strMeal: 'First',
        strCategory: 'Category',
        strArea: 'Area',
        strInstructions: 'Instructions',
        strMealThumb: 'strMealThumb',
        strIngredient1: 'ingredient1',
        strMeasure1: 'measure1',
        strYouTube: 'youtube',
      },
        {
          idMeal: '2',
          strMeal: 'Second',
          strCategory: 'Category',
          strArea: 'Area',
          strInstructions: 'Instructions',
          strMealThumb: 'strMealThumb',
          strIngredient1: 'ingredient2',
          strMeasure1: 'measure2',
          strYouTube: 'youtube',
        }],
    });
    renderWithRouter(<Category />);
    const preloader = screen.getByRole('progressbar');
    expect(preloader).toBeInTheDocument();
    await waitForElementToBeRemoved(preloader);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    // expect(screen.getByRole('button')).toMatchSnapshot();
  });
  it('should render a category and show preloader', async () => {
    apiSpy.mockResolvedValueOnce({
      meals: [],
    });
    renderWithRouter(<Category />);
    const preloader = await screen.findByRole('progressbar');
    const button = await screen.findByRole('button');
    expect(preloader).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});