import React, { Component } from 'react';
import { Provider } from 'react-redux';
import '../src/asset/style.css';
import store from "./store";
import Home from "./component/Home";

export default () =>
  <Provider store={store}>
    <Home />
  </Provider>;
