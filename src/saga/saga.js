import { call, put, takeLatest } from "redux-saga/effects";

import {
  INITIATE_FETCH_PROVIDER,
  initiateFetchProviderComplete,
  initiateFetchProviderError,
  INITIATE_POST_PROVIDER_DATA,
  initiatePostProviderComplete,
  initiatePostProviderError,
  INITIATE_DELETE_PROVIDER,
  initiateDeleteProviderComplete,
  initiateDeleteProviderError
} from "../action/actions";

import axios from 'axios';

function* fetchProviderApiData() {
  try {
    const fetchProviderCompletedata = yield call(axios.get, 'https://bxqbp336z7.execute-api.us-east-1.amazonaws.com/test/patientprovider');
    if (fetchProviderCompletedata && fetchProviderCompletedata.data) {
      yield put(initiateFetchProviderComplete(fetchProviderCompletedata.data));
    }
  }
  catch (errorData) {
    console.log(errorData)
    yield put(initiateFetchProviderError(errorData));
  }
}

function* postProviderApiData(action) {
  try {
    const postProviderCompletedata = yield call(axios.post, 'https://bxqbp336z7.execute-api.us-east-1.amazonaws.com/test/patientprovider', action.body);
    yield put(initiatePostProviderComplete(postProviderCompletedata));
  }
  catch (errorData) {
    console.log(errorData)
    yield put(initiatePostProviderError(errorData));
  }
}

function* deleteProviderApiData(action) {
  try {
    const deleteProviderCompleteData = yield call(
      axios.delete, 'https://bxqbp336z7.execute-api.us-east-1.amazonaws.com/test/patientprovider', {
        data: {
          provider_npi_dhct_number: action.body.provider_npi_dhct_number,
          ccm_patient_account_id: action.body.ccm_patient_account_id
        }
      })
    yield put(initiateDeleteProviderComplete(deleteProviderCompleteData));
  }
  catch (errorData) {
    console.log(errorData)
    yield put(initiateDeleteProviderError(errorData));
  }
}

export default function* mySaga() {
  yield takeLatest(INITIATE_FETCH_PROVIDER, fetchProviderApiData);
  yield takeLatest(INITIATE_POST_PROVIDER_DATA, postProviderApiData);
  yield takeLatest(INITIATE_DELETE_PROVIDER, deleteProviderApiData);
}

