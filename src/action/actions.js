export const REQUEST_API_DATA = "REQUEST_API_DATA";
export const RECEIVE_API_DATA = "RECEIVE_API_DATA";
export const DIPLAY_PAGE_VIEW = "DIPLAY_PAGE_VIEW";
export const ADD_PROVIDER_MODAL = "ADD_PROVIDER_MODAL";
export const DELETE_PROVIDER_MODAL = "DELETE_PROVIDER_MODAL";
export const EDIT_PROVIDER_MODAL = "EDIT_PROVIDER_MODAL";

export const requestApiData = () => ({ type: REQUEST_API_DATA });
export const receiveApiData = data => ({ type: RECEIVE_API_DATA, data });

export const diplayPageView = data => ({type: DIPLAY_PAGE_VIEW, data})
