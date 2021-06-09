import { createStore, combineReducers } from "redux";

export enum StoreActionType {}

export interface ActionType<T = any> {
  type: StoreActionType;
  payload: T;
}

const AppReducer = combineReducers({});

const store = createStore(AppReducer);

export default store;
