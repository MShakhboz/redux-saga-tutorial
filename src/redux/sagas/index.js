import { call, put, takeEvery, fork, spawn, select } from "redux-saga/effects";
import axios from "axios";

// fetching data fomr the API
async function getData(pattern) {
  const request = await fetch(`https://swapi.dev/api/${pattern}`);
  const data = request.json();
  console.log(request);
  return data;
}

function fetchData() {
  const options = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/weather",
    params: { q: "London,uk" },
    headers: {
      "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
      "X-RapidAPI-Key": "573bc962acmsheafdfc22464aa1fp18bff7jsna3160e411265",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      let result = response.data;
      console.log(result);
    })
    .catch(function (error) {
      return error;
    });
}

// worker saga ----> CHILD <---- which storing people data to the store

export function* peopelData() {
  const people = yield call(getData, "people");
  yield put({ type: "SET_PEOPLE", payload: people.results });
  const test = yield call(fetchData);
  console.log(test);
}

// worker saga ----> CHILD <---- which storing planets data to the store

export function* planetsData() {
  const planets = yield call(getData, "planets");
  yield put({ type: "SET_PLANETS", payload: planets.results });
}

// worker saga which storing planets data to the store

export function* workerSaga() {
  yield call(peopelData);
  yield call(planetsData);

  // one of the effects which selects data from store, or itself store also
  const store = yield select((e) => e.people);
  console.log(store);
}

// takeEvery watches click from DOM thas sends action <--- LOAD_DATA ---->. Then workerSaga starts to work.

export function* watchLoadDataSaga() {
  yield takeEvery("LOAD_DATA", workerSaga);
}

// combining all watcher sagas
export default function* rootSaga() {
  yield watchLoadDataSaga();
}
