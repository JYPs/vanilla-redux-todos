import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  console.log("aaa", action);
  switch (action.type) {
    case ADD_TODO:
      // redux에서 가장 중요한 부분 --> state를 변경하는게 아니라 새로운 Object를 만들어야 한다!!
      // 예를 들면 state.push(action.text)를 통해 state 즉 data에 추가(수정)하는게 아니라
      // 새로운! array를 만들어서 return 해야 한다!!
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE_TODO:
      // mutate를 하지 않는다는 의미에서 filter는 새로운 array를 만들기 때문에 아주 적절하다!
      // mutate한다는 것은 array를 직접 수정-> 즉, array.slice()로 변경 한다는 것 --> 이건 적절하지 않다!!
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

// addTodo도 dispatchDeleteTodo와 같이 변경이 가능하다!!!!!!!!!!!!!!!!
const addTodo = (text) => {
  store.dispatch({ type: ADD_TODO, text });
};

const dispatchDeleteToDo = (e) => {
  console.log("delete__id", e.target.parentNode.id);
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = ""; // 이거 주석 해보길... --> list 전체를 비움~~
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(() => console.log(store.getState()));
store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  addTodo(toDo);
};

form.addEventListener("submit", onSubmit);
