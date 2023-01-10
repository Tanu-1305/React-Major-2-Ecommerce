import * as actionType from '../constants/productConstant';




export const getProductsReducer = (state = { products: [] }, action) => {
  switch(action.type) {
    case actionType.Get_PRODUCTS_SUCCESS:
        return { products: action.payload }
    case actionType.Get_PRODUCTS_FAIL:
        return { error: action.payload }
    default: 
         return state
  }
}