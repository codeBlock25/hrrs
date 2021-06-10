import { ActionType, StoreActionType } from "..";

export interface EventReducerType {
  isLoggedIn: boolean;
  isNavOpen: boolean;
}

const init: EventReducerType = {
  isLoggedIn: false,
  isNavOpen: false,
};

export const eventReducer = (
  store = init,
  action: ActionType
): EventReducerType => {
  switch (action.type) {
    case StoreActionType.toggleNavBar:
      return { ...store, isNavOpen: !store.isNavOpen };

    default:
      return { ...store };
  }
};
