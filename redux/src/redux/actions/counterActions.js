import { DECREMENT, INCREMENT } from "../reducers/counterReducer";

export const increment = () => {
  return {
    type: INCREMENT
  };
};

export const decrement = () => {
  return {
    type: DECREMENT
  };
};