import {
  DISPLAY_PAGE_VIEW,
  INITIATE_FETCH_PROVIDER,
  INITIATE_FETCH_PROVIDER_COMPLETE,
  INITIATE_FETCH_PROVIDER_ERROR,
  INITIATE_FETCH_PROVIDER_RESET,
  INITIATE_FETCH_PROVIDER_PUT,
  INITIATE_FETCH_PROVIDER_PUT_COMPLETE,
  INITIATE_FETCH_PROVIDER_PUT_ERROR,
  INITIATE_FETCH_PROVIDER_PUT_RESET,
  INITIATE_FETCH_DHCT,
  INITIATE_FETCH_DHCT_COMPLETE,
  INITIATE_FETCH_DHCT_ERROR,
  INITIATE_FETCH_DHCT_RESET
} from "../action/actions";

const defaultState = {
  initiate_fetch_provider: false,
  initiate_fetch_provider_complete: false,
  initiate_fetch_provider_error: false,
  fetch_provider_data: {},
  fetch_provider_error_data: {},
  display_view_data: '',

  initiate_fetch_provider_put: false,
  initiate_fetch_provider_put_complete: false,
  initiate_fetch_provider_put_error: false,
  fetch_provider_put_data: {},
  fetch_provider_put_error_data: {},

  initiate_fetch_dhct: false,
  initiate_fetch_dhct_complete: false,
  initiate_fetch_dhct_error: false,
  fetch_dhct_data: {},
  fetch_dhct_error_data: {},
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

    case INITIATE_FETCH_PROVIDER_PUT: {
      return { ...state, initiate_fetch_provider_put: true };
    }
    case INITIATE_FETCH_PROVIDER_PUT_COMPLETE: {
      return { ...state, initiate_fetch_provider_put: false, initiate_fetch_provider_put_complete: true, fetch_provider_put_data: action.fetchProviderPutCompletedata };
    }
    case INITIATE_FETCH_PROVIDER_PUT_ERROR: {
      return { ...state, initiate_fetch_provider_put_error: true, fetch_provider_put_error_data: action.errorData };
    }
    case INITIATE_FETCH_PROVIDER_PUT_RESET: {
      return {
        ...state, initiate_fetch_provider_put: false,
        initiate_fetch_provider_put_complete: false,
        initiate_fetch_provider_put_error: false,
        fetch_provider_put_data: {},
        fetch_provider_put_error_data: {}
      };
    }

    case INITIATE_FETCH_DHCT: {
      return { ...state, initiate_fetch_dhct: true };
    }
    case INITIATE_FETCH_DHCT_COMPLETE: {
      return { ...state, initiate_fetch_dhct: false, initiate_fetch_dhct_complete: true, fetch_dhct_data: action.fetchDhctCompletedata };
    }
    case INITIATE_FETCH_DHCT_ERROR: {
      return { ...state, initiate_fetch_dhct_error: true, fetch_dhct_error_data: action.errorData };
    }
    case INITIATE_FETCH_DHCT_RESET: {
      return {
        ...state,
        initiate_fetch_dhct: false,
        initiate_fetch_dhct_complete: false,
        initiate_fetch_dhct_error: false,
        fetch_dhct_data: {},
        fetch_dhct_error_data: {},
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
