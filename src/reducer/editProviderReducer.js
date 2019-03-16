import {
    INITIATE_EDIT_PROVIDER,
    INITIATE_EDIT_PROVIDER_COMPLETE,
    INITIATE_EDIT_PROVIDER_ERROR,
    INITIATE_EDIT_PROVIDER_RESET
  } from "../action/actions";
  
  const defaultState = {
    initiate_edit_provider: false,
    initiate_edit_provider_complete: false,
    initiate_edit_provider_error: false,
    edit_provider_data: {},
    edit_provider_error_data: {},
  };
  
  const editProviderReducer = function (state = defaultState, action) {
  
    switch (action.type) {
      case INITIATE_EDIT_PROVIDER: {
        return { ...state, initiate_edit_provider: true };
      }
      case INITIATE_EDIT_PROVIDER_COMPLETE: {
        return { ...state, initiate_edit_provider: false, initiate_edit_provider_complete: true, edit_provider_data: action.editProviderCompletedata };
      }
      case INITIATE_EDIT_PROVIDER_ERROR: {
        return { ...state, initiate_edit_provider_error: true, edit_provider_error_data: action.errorData };
      }
      case INITIATE_EDIT_PROVIDER_RESET: {
        return {
          initiate_edit_provider: false,
          initiate_edit_provider_complete: false,
          initiate_edit_provider_error: false,
          edit_provider_data: {},
          edit_provider_error_data: {},
        };
      }
      default: {
        return { ...state };
      }
    }
  };
  
  export default editProviderReducer;
  