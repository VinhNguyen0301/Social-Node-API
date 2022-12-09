import React, { useReducer } from "react";

const counterReducer = (state, action) => {
  switch (action) {
    case "Plus":
      return (state = state + 1);
    case "Decline":
      return (state = state - 1);
    case "Delete_All":
      return 0;
    default:
      return state;
  }
};
const counter2Reducer = (state, action) => {
  switch (action.type) {
    case "Binding_Valua_1":
      return action.value;
    case "Binding_Valua_2":
      return action.value;
    default:
      return state;
  }
};
//  test
const initState = {
  // b1
  data: [],
  isLoading: false,
  error: null,
};

const userReducer = (state, action) => {
  //b2
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.data,
      };
    case "GET_USER_ERROR":
      return {
        ...state,
        data: [],
        error: action.data,
      };
    default:
      return state;
  }
};

const Counter = () => {
  const [counter, dispatch] = useReducer(counterReducer, 0);
  const [count2, dispatch2] = useReducer(counter2Reducer, 0);
  const [user, dispatchUser] = useReducer(userReducer, initState); // b0
  const fetchDataApi = () => {
    // b3
    dispatchUser({ type: "GET_USER" });
    setTimeout(() => {
      fetch("https://reqres.in/api/users")
        .then((res) => res.json())
        .then((data) => dispatchUser({ type: "GET_USER_SUCCESS", data: data }))
        .catch((err) => {
          dispatchUser({ type: "GET_USER_ERROR", data: err });
        });
    }, 2000);
  };

  return (
    <div>
      <div>
        <button onClick={fetchDataApi}>Fetch API</button>
        {user.isLoading ? <p>Loading ...</p> : <p>{JSON.stringify(user)}</p>}
      </div>
      <p>Counter : {counter}</p>
      <div>
        <button onClick={() => dispatch("Plus")}>Plus</button>
        <button onClick={() => dispatch("Decline")}>Decline</button>
        <button onClick={() => dispatch("Delete_All")}>Delete All</button>
      </div>
      <p>Counter2 : {count2}</p>
      <button
        onClick={() =>
          dispatch2({
            type: "Binding_Valua_1",
            value: 10,
          })
        }
      >
        Binding data
      </button>
      <button
        onClick={() =>
          dispatch2({
            type: "Binding_Valua_2",
            value: 20,
          })
        }
      >
        Binding data 2
      </button>
    </div>
  );
};

export default Counter;
