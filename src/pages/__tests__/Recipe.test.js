import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import * as api from '../../api';
import { Recipe } from '../Recipe';
import { renderWithRouter } from '../../utils/testing';

const apiSpy = jest.spyOn(api, 'getMealById');

describe('Recipe', () => {
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
        strYouTube: 'youtube'
      }]
    });
    renderWithRouter(<Recipe />);
    const preloader = screen.getByRole('progressbar');
    expect(preloader).toBeInTheDocument();
    await waitForElementToBeRemoved(preloader);
    expect(screen.getByRole('article')).toMatchSnapshot();
  });
  it('should render a recipe witout area and youtube', async () => {
    apiSpy.mockResolvedValueOnce({
      meals: [{
        idMeal: '1',
        strMeal: 'First',
        strCategory: 'Category',
        strInstructions: 'Instructions',
        strMealThumb: 'strMealThumb',
        strIngredient1: 'ingredient1',
        strMeasure1: 'measure1',
      }]
    });
    renderWithRouter(<Recipe />);
    const preloader = screen.getByRole('progressbar');
    expect(preloader).toBeInTheDocument();
    await waitForElementToBeRemoved(preloader);
    expect(screen.getByRole('article')).toMatchSnapshot();
  });
})