import { call, put, takeLatest } from "redux-saga/effects";
import axios from 'axios';

import {
  INITIATE_FETCH_PROVIDER,
  initiateFetchProviderComplete,
  initiateFetchProviderError,
  INITIATE_POST_PROVIDER_DATA,
  initiatePostProviderComplete,
  initiatePostProviderError,
  INITIATE_DELETE_PROVIDER,
  initiateDeleteProviderComplete,
  initiateDeleteProviderError,
  INITIATE_FETCH_PROVIDER_PUT,
  initiateFetchProviderPutComplete,
  initiateFetchProviderPutError,
  INITIATE_FETCH_DHCT,
  initiateFetchDhctComplete,
  initiateFetchDhctError
} from "../action/actions";

function* fetchProviderApiData() {
  try {
    const fetchProviderCompletedata = yield call(axios.get, 'https://kgoz305mdk.execute-api.us-east-1.amazonaws.com/dev/patientdemographics');
    if (fetchProviderCompletedata && fetchProviderCompletedata.data) {
      yield put(initiateFetchProviderComplete(fetchProviderCompletedata.data));
    }
  }
  catch (errorData) {
    console.log(errorData)
    yield put(initiateFetchProviderError(errorData));
  }
}

function* fetchProviderPutApiData(action) {
  console.log('in put->' + action.body)
  try {
    const fetchProviderPutCompletedata = yield call(axios.put, 'https://kgoz305mdk.execute-api.us-east-1.amazonaws.com/dev/getccmpatientproviders', action.body);
    if (fetchProviderPutCompletedata) {
      yield put(initiateFetchProviderPutComplete(fetchProviderPutCompletedata));
    }
  }
  catch (errorData) {
    console.log(errorData)
    yield put(initiateFetchProviderPutError(errorData));
  }
}

function* fetchDhctApiData(action) {
  try {
    const fetchDhctCompletedata = yield call(axios.put, 'https://kgoz305mdk.execute-api.us-east-1.amazonaws.com/dev/getdhctpatientprovider', action.body);
    yield put(initiateFetchDhctComplete(fetchDhctCompletedata));
  }
  catch (errorData) {
    console.log(errorData)
    yield put(initiateFetchDhctError(errorData));
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
  yield takeLatest(INITIATE_FETCH_PROVIDER_PUT, fetchProviderPutApiData);
  yield takeLatest(INITIATE_FETCH_DHCT, fetchDhctApiData);
}

