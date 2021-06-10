import { createStore, combineReducers } from "redux";
import {
  recordReducer,
  RecordReducerType,
  EventReducerType,
  eventReducer,
} from "./reducer";

export enum StoreActionType {
  initDetails,
  initReservationDetails,
  toggleNavBar,
  addReservationDetails,
}

export interface ActionType<T = any> {
  type: StoreActionType;
  payload: T;
}

export interface AppReducerType {
  event: EventReducerType;
  record: RecordReducerType;
}

const AppReducer = combineReducers<AppReducerType, ActionType>({
  record: recordReducer,
  event: eventReducer,
});

const store = createStore(AppReducer);

export default store;
