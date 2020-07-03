import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      // redux에서 가장 중요한 부분 --> state를 변경하는게 아니라 새로운 Object를 만들어야 한다!!
      // 예를 들면 state.push(action.text)를 통해 state 즉 data에 추가하는게 아니라
      // 새로운! array를 만들어서 return 해야 한다!!
      return [...state, { type: action.text, id: Date.now() }];
    case DELETE_TODO:
      return [];
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  store.dispatch({ type: ADD_TODO, text: toDo });
};

form.addEventListener("submit", onSubmit);
