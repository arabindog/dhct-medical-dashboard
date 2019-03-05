import {
  INITIATE_DELETE_PROVIDER,
  INITIATE_DELETE_PROVIDER_COMPLETE,
  INITIATE_DELETE_PROVIDER_DATA_RESET,
  INITIATE_DELETE_PROVIDER_ERROR
} from "../action/actions";

const defaultState = {
  initiate_delete_provider: false,
  initiate_delete_provider_complete: false,
  initiate_delete_provider_error: false,
  delete_provider_data: {},
  delete_provider_error_data: {},
};

const deleteProviderReducer = function (state = defaultState, action) {

  switch (action.type) {
    case INITIATE_DELETE_PROVIDER: {
      return { ...state, initiate_delete_provider: true };
    }
    case INITIATE_DELETE_PROVIDER_COMPLETE: {
      return { ...state, initiate_delete_provider: false, initiate_delete_provider_complete: true, delete_provider_data: action.deleteProviderCompletedata };
    }
    case INITIATE_DELETE_PROVIDER_ERROR: {
      return { ...state, initiate_delete_provider_error: true, delete_provider_error_data: action.errorData };
    }
    case INITIATE_DELETE_PROVIDER_DATA_RESET: {
      return {
        initiate_delete_provider: false,
        initiate_delete_provider_complete: false,
        initiate_delete_provider_error: false,
        delete_provider_data: {},
        delete_provider_error_data: {},
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default deleteProviderReducer;
