import { combineReducers } from "redux";

import fetchReducer from "../reducer/fetchProviderReducer";
import addProviderReducer from "../reducer/addProviderReducer";
import deleteProviderReducer from "../reducer/deleteProviderReducer";
import editProviderReducer from "../reducer/editProviderReducer";

export default combineReducers({
  fetchReducer,
  addProviderReducer,
  deleteProviderReducer,
  editProviderReducer
});
