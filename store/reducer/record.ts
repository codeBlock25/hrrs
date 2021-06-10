import { concat } from "lodash";
import { ActionType, StoreActionType } from "..";
import { Gender } from "../../pages/auth/register";

export enum BedSpaceType {
  secA,
  secB,
  secC,
  secD,
}

export interface RecordReducerType {
  details: {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    gender?: Gender;
    registrationNumber?: string;
    phone_number?: string;
    verificationCode?: string;
    isVerified?: boolean;
    date?: Date;

    yearOfStudy?: string;
    department?: string;
    nationality?: string;
    state?: string;
    lga?: string;
    address?: string;
    guardian_firstName?: string;
    guardian_lastName?: string;
    guardian_relationship?: string;
    guardian_phoneNumber?: string;
    _id?: string;
    userID?: string;
  };
  reservations: {
    hostel_name: string;
    floor: number;
    room_name: string;
    bed_space: BedSpaceType;
    userID: string;
    date: Date;
    _id: string;
  }[];
}

const init: RecordReducerType = {
  details: {},
  reservations: [],
};

export const recordReducer = (
  store = init,
  action: ActionType
): RecordReducerType => {
  switch (action.type) {
    case StoreActionType.initDetails:
      return { ...store, details: action.payload };
    case StoreActionType.initReservationDetails:
      return { ...store, reservations: action.payload };
    case StoreActionType.addReservationDetails:
      return {
        ...store,
        reservations: concat(store.reservations, [action.payload]),
      };
    default:
      return { ...store };
  }
};
