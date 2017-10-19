import * as CategoryApi from '../utils/CategoriesAPI'
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch =>
  (
    CategoryApi
      .getAll()
      .then(categories => dispatch(getCategories(categories)))
  );