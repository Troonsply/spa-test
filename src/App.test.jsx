import { renderWithRouter } from './utils/testing.js';
import { screen} from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: (({ children }) => <div>{children}</div>),
}));

jest.mock('./pages/Home', () => ({
  Home: () => <div data-testid="home">Home</div>
}));

jest.mock('./pages/About', () => ({
  About: () => <div data-testid="about">About</div>
}));

jest.mock('./pages/Contact', () => ({
  Contact: () => <div data-testid="contact">Contact</div>
}));

jest.mock('./pages/Category', () => ({
  Category: () => <div data-testid="category">Category</div>
}));

jest.mock('./pages/Recipe', () => ({
  Recipe: () => <div data-testid="recipe">Recipe</div>
}));

jest.mock('./pages/NotFound', () => ({
  NotFound: () => <div data-testid="notFound">NotFound</div>
}));

describe('App', () => {
  it('should render App', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });

  it('should render About', () => {
    renderWithRouter(<App />, {initialEntries: ['/about']});
    expect(screen.getByTestId('about')).toBeInTheDocument();
  });

  it('should render Contact', () => {
    renderWithRouter(<App />, {initialEntries: ['/contacts']});
    expect(screen.getByTestId('contact')).toBeInTheDocument();
  });

  it('should render Category', () => {
    renderWithRouter(<App />, {initialEntries: ['/category/beef']});
    expect(screen.getByTestId('category')).toBeInTheDocument();
  });

  it('should render Recipe', () => {
    renderWithRouter(<App />, {initialEntries: ['/meal/52771']});
    expect(screen.getByTestId('recipe')).toBeInTheDocument();
  });

  it('should render NotFound', () => {
    renderWithRouter(<App />, {initialEntries: ['/404']});
    expect(screen.getByTestId('notFound')).toBeInTheDocument();
  });

})