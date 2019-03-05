export const DISPLAY_PAGE_VIEW = "DISPLAY_PAGE_VIEW";
export const UPDATE_PROVIDER_ID = "UPDATE_PROVIDER_ID";

export const INITIATE_FETCH_PROVIDER = "INITIATE_FETCH_PROVIDER";
export const INITIATE_FETCH_PROVIDER_COMPLETE = "INITIATE_FETCH_PROVIDER_COMPLETE";
export const INITIATE_FETCH_PROVIDER_ERROR = "INITIATE_FETCH_PROVIDER_ERROR";
export const INITIATE_FETCH_PROVIDER_RESET = "INITIATE_FETCH_PROVIDER_RESET";

export const INITIATE_POST_PROVIDER_DATA = "INITIATE_POST_PROVIDER_DATA";
export const INITIATE_POST_PROVIDER_DATA_COMPLETE = "INITIATE_POST_PROVIDER_DATA_COMPLETE";
export const INITIATE_POST_PROVIDER_DATA_ERROR = "INITIATE_POST_PROVIDER_DATA_ERROR";
export const INITIATE_POST_PROVIDER_DATA_RESET = "INITIATE_POST_PROVIDER_DATA_RESET";

export const INITIATE_DELETE_PROVIDER = "INITIATE_DELETE_PROVIDER";
export const INITIATE_DELETE_PROVIDER_COMPLETE = "INITIATE_DELETE_PROVIDER_COMPLETE";
export const INITIATE_DELETE_PROVIDER_ERROR = "INITIATE_DELETE_PROVIDER_DATA_ERROR";
export const INITIATE_DELETE_PROVIDER_DATA_RESET = "INITIATE_DELETE_PROVIDER_DATA_RESET";

export const ADD_PROVIDER_MODAL = "ADD_PROVIDER_MODAL";
export const DELETE_PROVIDER_MODAL = "DELETE_PROVIDER_MODAL";
export const EDIT_PROVIDER_MODAL = "EDIT_PROVIDER_MODAL";


export const diplayPageView = displayViewData => ({ type: DISPLAY_PAGE_VIEW, displayViewData })
export const updateProviderID = updateProviderID => ({ type: UPDATE_PROVIDER_ID, updateProviderID })

export const initiateFetchProvider = () => ({ type: INITIATE_FETCH_PROVIDER });
export const initiateFetchProviderComplete = fetchProviderCompletedata => ({ type: INITIATE_FETCH_PROVIDER_COMPLETE, fetchProviderCompletedata });
export const initiateFetchProviderError = errorData => ({ type: INITIATE_FETCH_PROVIDER_ERROR, errorData });
export const initiateFetchProviderReset = () => ({ type: INITIATE_FETCH_PROVIDER_RESET });

export const initiatePostProvider = body => ({ type: INITIATE_POST_PROVIDER_DATA, body })
export const initiatePostProviderComplete = postProviderCompletedata => ({ type: INITIATE_POST_PROVIDER_DATA_COMPLETE, postProviderCompletedata })
export const initiatePostProviderError = errorData => ({ type: INITIATE_POST_PROVIDER_DATA_ERROR, errorData })
export const initiatePostProviderReset = () => ({ type: INITIATE_POST_PROVIDER_DATA_RESET })

export const initiateDeleteProvider = body => ({ type: INITIATE_DELETE_PROVIDER, body })
export const initiateDeleteProviderComplete = deleteProviderCompleteData => ({ type: INITIATE_DELETE_PROVIDER_COMPLETE, deleteProviderCompleteData })
export const initiateDeleteProviderError = errorData => ({ type: INITIATE_DELETE_PROVIDER_ERROR, errorData })
export const initiateDeleteProviderReset = () => ({ type: INITIATE_DELETE_PROVIDER_DATA_RESET })
