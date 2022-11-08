import { dataApi } from "../API/api";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_PRODUCTS = "SET_PRODUCTS";

const initialState = {
  allPages: null,
  currentPage: 1,
  productsList: {},
  isLoading: true,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const setPages = (currentPage, allPages) => {
  return { type: SET_CURRENT_PAGE, payload: { currentPage, allPages } };
};
export const setProducts = (currentPage, productsList, allPages) => {
  return {
    type: SET_PRODUCTS,
    payload: { currentPage, productsList, allPages },
  };
};
export const getProductsThunk = (currentPage) => async (dispatch) => {
  const response = await dataApi
    .getProducts(currentPage)
    .then((response) => response.json())
    .then((data) =>
      dispatch(setProducts(data.current_page, data.data, data.last_page))
    );
};
export const setPageThunk = (currentPage) => async (dispatch) => {
  await dataApi
    .getProducts(currentPage)
    .then((response) => response.json())
    .then((data) =>
      dispatch(setProducts(data.current_page, data.data, data.last_page))
    );
};

export const setFilters = (filtersData) => async (dispatch) => {
  await dataApi
    .getProductsFilters(filtersData)
    .then((response) => response.json())
    .then((data) =>
      dispatch(setProducts(data.current_page, data.data, data.last_page))
    );
};
export default productsReducer;
