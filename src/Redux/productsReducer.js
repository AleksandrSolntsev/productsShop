import { dataApi } from "../API/api";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_PRODUCTS = "SET_PRODUCTS"


const initialState = {
    //стартовые входные данные
   
    allPages: null,
    currentPage: 1,
    productsList: {}

  };
  
  const productsReducer = (state = initialState, action) => {
  ////если в стейт ничего не приходит, возми данные из initialState
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        ...action.payload, // в созданом обьекте data будет лежать id email login (перезатрут ...state)
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        ...action.payload, // в созданом обьекте data будет лежать id email login (перезатрут ...state)
      };

    default: ///если совпадений нет вернуть стейт
      return state;
  }
};
  
export const setPages = (currentPage, allPages) => {
  return { type: SET_CURRENT_PAGE, payload: { currentPage, allPages } };

};
export const setProducts = (currentPage, productsList, allPages) => {
  return { type: SET_PRODUCTS, payload: { currentPage, productsList, allPages} };
};



export const getProductsThunk = (currentPage) => async (dispatch) => {
  
  const response = await dataApi.getProducts(currentPage).then(response => response.json())
  .then(data => dispatch(setProducts(data.current_page, data.data, data.last_page)));
  
}
export const setPageThunk = (currentPage) => async (dispatch) => {
  
  const response = await dataApi.getProducts(currentPage).then(response => response.json())
  .then(data => dispatch(setProducts(data.current_page, data.data, data.last_page)));
  
}

export const setFilters = (filtersData) => async (dispatch) => {
  
  localStorage.setItem("filters", JSON.stringify(filtersData))
  
  const response = await dataApi.getProductsFilters().then(response => response.json())
  .then(data => dispatch(setProducts(data.current_page, data.data, data.last_page)));
  // .then(data => dispatch(setProducts(currentPage, data.data, data.last_page)));
  
}


// dataApi.getProducts(currentPage).then(response => response.json())
//     .then(data => setAllPages(data.last_page));
//     dataApi.getProducts(currentPage).then(response => response.json())
//     // .then(res => console.log(res))
//     .then(data => setData(data.data));


  export default productsReducer