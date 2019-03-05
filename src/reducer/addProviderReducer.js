import {
  INITIATE_POST_PROVIDER_DATA,
  INITIATE_POST_PROVIDER_DATA_COMPLETE,
  INITIATE_POST_PROVIDER_DATA_ERROR,
  INITIATE_POST_PROVIDER_DATA_RESET,
  UPDATE_PROVIDER_ID
} from "../action/actions";

const defaultState = {
  initiate_post_provider: false,
  initiate_post_provider_complete: false,
  initiate_post_provider_error: false,
  post_provider_data: {},
  post_provider_error_data: {},
  update_provider_id: ''
};

const addProviderReducer = function (state = defaultState, action) {

  switch (action.type) {
    case INITIATE_POST_PROVIDER_DATA: {
      return { ...state, initiate_post_provider: true };
    }
    case INITIATE_POST_PROVIDER_DATA_COMPLETE: {
      return { ...state, initiate_post_provider: false, initiate_post_provider_complete: true, post_provider_data: action.postProviderCompletedata };
    }
    case INITIATE_POST_PROVIDER_DATA_ERROR: {
      return { ...state, initiate_post_provider_error: true, post_provider_error_data: action.errorData };
    }
    case INITIATE_POST_PROVIDER_DATA_RESET: {
      return {
        initiate_post_provider: false,
        initiate_post_provider_complete: false,
        initiate_post_provider_error: false,
        post_provider_data: {},
        post_provider_error_data: {},
      };
    }
    case UPDATE_PROVIDER_ID: {
      return { ...state, update_provider_id: action.updateProviderID };
    }
    default: {
      return { ...state };
    }
  }
};

export default addProviderReducer;
