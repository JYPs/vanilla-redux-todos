import React, { useState } from "react";
import { connect } from "react-redux"; // store에서 state를 가져오기 위해서 store에 연결하는 역할
import { actionCreators } from "../store";
import ToDo from "../components/ToDo";

function Home({ toDos, addToDo, ...rest }) {
  // console.log("props::", rest);
  const [text, setText] = useState("");
  function onChange(e) {
    setText(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    // console.log("submit!!", text);
    addToDo(text); // 이건 dispatch를 실행하는 함수~~
    setText("");
  }
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
}

// 이 함수를 이용해서 Redux store로 부터 state를 가져 올 것이다~
// 공식 문서에서는 이걸 mapStateToProps라고 부른다 :: Redux state를 component의 props에 맵핑 한다라고 생각!!!
// state : Redux store로부터 온 것
// ownProps : Component의 props <-- Home 컴포넌트의 props, 이는 react-router에 의해서 주어졌다
// Provider로 store를 하위 컴포넌트에 넘겨 줬다!!!! --> 그러니까 하위 컴포넌트인 Home.js에서 store에 연결이 되어 있음
// 이 함수는 그냥 redux의 store.getState()와 유사하다
function getCurrentState(state, ownProps) {
  // console.log("aaa ::", state, ownProps);
  // return { sexy: true }; // connect()는 Home으로 보내는 props에 추가될 수 있도록 허용해 준다
  return { toDos: state };
}

// 이 함수는 그냥 redux의 store.dispatch()와 유사하다
function mapDispatchToProps(dispatch, ownProps) {
  // console.log(dispatch, ownProps);
  return {
    // 함수를 만드는것임!!! addToDo가 실행되면 dispatch를 호출~
    // 이 addToDo는 Home 컴포넌트에 props로 전달이 된다
    addToDo: (text) => dispatch(actionCreators.addToDo(text)),
  };
}

export default connect(getCurrentState, mapDispatchToProps)(Home);
