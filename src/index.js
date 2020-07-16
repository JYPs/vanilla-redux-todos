import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store";

/* 
  The <Provider /> makes the Redux store available to any nested components that have been wrapped in the connect() function.
  인덱스에서 내 어플리케이션을 store에 연결함
  ==> 리덕스 저장소를 사용할 수 있게 함

  store의 subscribe를 react-redux 방식으로 변경하기 위함~~
*/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
