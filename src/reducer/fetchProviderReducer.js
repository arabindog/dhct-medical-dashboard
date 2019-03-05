import {
  DISPLAY_PAGE_VIEW,
  INITIATE_FETCH_PROVIDER,
  INITIATE_FETCH_PROVIDER_COMPLETE,
  INITIATE_FETCH_PROVIDER_ERROR,
  INITIATE_FETCH_PROVIDER_RESET
} from "../action/actions";

const defaultState = {
  initiate_fetch_provider: false,
  initiate_fetch_provider_complete: false,
  initiate_fetch_provider_error: false,
  fetch_provider_data: {},
  fetch_provider_error_data: {},
  display_view_data: ''
};

const fetchReducer = function (state = defaultState, action) {

  switch (action.type) {
    case INITIATE_FETCH_PROVIDER: {
      return { ...state, initiate_fetch_provider: true };
    }
    case INITIATE_FETCH_PROVIDER_COMPLETE: {
      return { ...state, initiate_fetch_provider: false, initiate_fetch_provider_complete: true, fetch_provider_data: action.fetchProviderCompletedata };
    }
    case INITIATE_FETCH_PROVIDER_ERROR: {
      return { ...state, initiate_fetch_provider_error: true, fetch_provider_error_data: action.errorData };
    }
    case INITIATE_FETCH_PROVIDER_RESET: {
      return {
        ...state, initiate_fetch_provider: false,
        initiate_fetch_provider_complete: false,
        initiate_fetch_provider_error: false,
        fetch_provider_data: {},
        fetch_provider_error_data: {}
      };
    }
    case DISPLAY_PAGE_VIEW: {
      return { ...state, display_view_data: action.displayViewData };
    }
    default: {
      return { ...state };
    }
  }
};

export default fetchReducer;
