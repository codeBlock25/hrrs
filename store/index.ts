import { createStore, combineReducers } from "redux";
import { EventReducerType } from "./reducer/event";
import { recordReducer, RecordReducerType } from "./reducer/record";

export enum StoreActionType {
  initDetails,
  initReservationDetails,
}

export interface ActionType<T = any> {
  type: StoreActionType;
  payload: T;
}

export interface AppReducerType {
  event: EventReducerType;
  record: RecordReducerType;
}

const AppReducer = combineReducers({
  record: recordReducer,
});

const store = createStore(AppReducer);

export default store;
