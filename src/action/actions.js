export const DISPLAY_PAGE_VIEW = "DISPLAY_PAGE_VIEW";
export const UPDATE_PROVIDER_ID = "UPDATE_PROVIDER_ID";

export const INITIATE_FETCH_PROVIDER = "INITIATE_FETCH_PROVIDER";
export const INITIATE_FETCH_PROVIDER_COMPLETE = "INITIATE_FETCH_PROVIDER_COMPLETE";
export const INITIATE_FETCH_PROVIDER_ERROR = "INITIATE_FETCH_PROVIDER_ERROR";
export const INITIATE_FETCH_PROVIDER_RESET = "INITIATE_FETCH_PROVIDER_RESET";

export const INITIATE_FETCH_PROVIDER_PUT = "INITIATE_FETCH_PROVIDER_PUT";
export const INITIATE_FETCH_PROVIDER_PUT_COMPLETE = "INITIATE_FETCH_PROVIDER_PUT_COMPLETE";
export const INITIATE_FETCH_PROVIDER_PUT_ERROR = "INITIATE_FETCH_PROVIDER_PUT_ERROR";
export const INITIATE_FETCH_PROVIDER_PUT_RESET = "INITIATE_FETCH_PROVIDER_PUT_RESET";

export const INITIATE_FETCH_DHCT = "INITIATE_FETCH_DHCT";
export const INITIATE_FETCH_DHCT_COMPLETE = "INITIATE_FETCH_DHCT_COMPLETE";
export const INITIATE_FETCH_DHCT_ERROR = "INITIATE_FETCH_DHCT_ERROR";
export const INITIATE_FETCH_DHCT_RESET = "INITIATE_FETCH_DHCT_RESET";

export const INITIATE_POST_PROVIDER_DATA = "INITIATE_POST_PROVIDER_DATA";
export const INITIATE_POST_PROVIDER_DATA_COMPLETE = "INITIATE_POST_PROVIDER_DATA_COMPLETE";
export const INITIATE_POST_PROVIDER_DATA_ERROR = "INITIATE_POST_PROVIDER_DATA_ERROR";
export const INITIATE_POST_PROVIDER_DATA_RESET = "INITIATE_POST_PROVIDER_DATA_RESET";

export const INITIATE_DELETE_PROVIDER = "INITIATE_DELETE_PROVIDER";
export const INITIATE_DELETE_PROVIDER_COMPLETE = "INITIATE_DELETE_PROVIDER_COMPLETE";
export const INITIATE_DELETE_PROVIDER_ERROR = "INITIATE_DELETE_PROVIDER_DATA_ERROR";
export const INITIATE_DELETE_PROVIDER_DATA_RESET = "INITIATE_DELETE_PROVIDER_DATA_RESET";

export const INITIATE_EDIT_PROVIDER = "INITIATE_EDIT_PROVIDER";
export const INITIATE_EDIT_PROVIDER_COMPLETE = "INITIATE_EDIT_PROVIDER_COMPLETE";
export const INITIATE_EDIT_PROVIDER_ERROR = "INITIATE_EDIT_PROVIDER_DATA_ERROR";
export const INITIATE_EDIT_PROVIDER_RESET = "INITIATE_EDIT_PROVIDER_DATA_RESET";

export const ADD_PROVIDER_MODAL = "ADD_PROVIDER_MODAL";
export const DELETE_PROVIDER_MODAL = "DELETE_PROVIDER_MODAL";
export const EDIT_PROVIDER_MODAL = "EDIT_PROVIDER_MODAL";


export const diplayPageView = displayViewData => ({ type: DISPLAY_PAGE_VIEW, displayViewData })
export const updateProviderID = updateProviderID => ({ type: UPDATE_PROVIDER_ID, updateProviderID })

export const initiateFetchProvider = () => ({ type: INITIATE_FETCH_PROVIDER });
export const initiateFetchProviderComplete = fetchProviderCompletedata => ({ type: INITIATE_FETCH_PROVIDER_COMPLETE, fetchProviderCompletedata });
export const initiateFetchProviderError = errorData => ({ type: INITIATE_FETCH_PROVIDER_ERROR, errorData });
export const initiateFetchProviderReset = () => ({ type: INITIATE_FETCH_PROVIDER_RESET });

export const initiateFetchProviderPut = body => ({ type: INITIATE_FETCH_PROVIDER_PUT, body });
export const initiateFetchProviderPutComplete = fetchProviderPutCompletedata => ({ type: INITIATE_FETCH_PROVIDER_PUT_COMPLETE, fetchProviderPutCompletedata });
export const initiateFetchProviderPutError = errorData => ({ type: INITIATE_FETCH_PROVIDER_PUT_ERROR, errorData });
export const initiateFetchProviderPutReset = () => ({ type: INITIATE_FETCH_PROVIDER_PUT_RESET });

export const initiateFetchDhct = body => ({ type: INITIATE_FETCH_DHCT, body });
export const initiateFetchDhctComplete = fetchDhctCompletedata => ({ type: INITIATE_FETCH_DHCT_COMPLETE, fetchDhctCompletedata });
export const initiateFetchDhctError = errorData => ({ type: INITIATE_FETCH_DHCT_ERROR, errorData });
export const initiateFetchDhctReset = () => ({ type: INITIATE_FETCH_DHCT_RESET });

export const initiatePostProvider = body => ({ type: INITIATE_POST_PROVIDER_DATA, body })
export const initiatePostProviderComplete = postProviderCompletedata => ({ type: INITIATE_POST_PROVIDER_DATA_COMPLETE, postProviderCompletedata })
export const initiatePostProviderError = errorData => ({ type: INITIATE_POST_PROVIDER_DATA_ERROR, errorData })
export const initiatePostProviderReset = () => ({ type: INITIATE_POST_PROVIDER_DATA_RESET })

export const initiateDeleteProvider = body => ({ type: INITIATE_DELETE_PROVIDER, body })
export const initiateDeleteProviderComplete = deleteProviderCompleteData => ({ type: INITIATE_DELETE_PROVIDER_COMPLETE, deleteProviderCompleteData })
export const initiateDeleteProviderError = errorData => ({ type: INITIATE_DELETE_PROVIDER_ERROR, errorData })
export const initiateDeleteProviderReset = () => ({ type: INITIATE_DELETE_PROVIDER_DATA_RESET })

export const initiateEditProvider = body => ({ type: INITIATE_EDIT_PROVIDER, body })
export const initiateEditProviderComplete = editProviderCompleteData => ({ type: INITIATE_EDIT_PROVIDER_COMPLETE, editProviderCompleteData })
export const initiateEditProviderError = errorData => ({ type: INITIATE_EDIT_PROVIDER_ERROR, errorData })
export const initiateEditProviderReset = () => ({ type: INITIATE_EDIT_PROVIDER_RESET })
