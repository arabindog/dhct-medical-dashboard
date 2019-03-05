import { combineReducers } from "redux";

import fetchReducer from "../reducer/fetchProviderReducer";
import addProviderReducer from "../reducer/addProviderReducer";
import deleteProviderReducer from "../reducer/deleteProviderReducer";

export default combineReducers({
  fetchReducer,
  addProviderReducer,
  deleteProviderReducer
});
