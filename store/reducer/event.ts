import { ActionType } from "..";

export interface EventReducerType {
  isLoggedIn: boolean;
}

const init: EventReducerType = {
  isLoggedIn: false,
};

// export const eventReducer = (store=init, action: ActionType) => {
//     switch (action.type) {
//         case value:

//             break;

//         default:
//             break;
//     }
// }
