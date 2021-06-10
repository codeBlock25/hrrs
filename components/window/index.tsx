import { useState } from "react";

import {
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
} from "@material-ui/core";

import { motion } from "framer-motion";
import axios from "axios";
import { server_url } from "../../config";
import { toast } from "react-toastify";
import { BedSpaceType } from "../../store/reducer";
import { find } from "lodash";
import { useDispatch } from "react-redux";
import { StoreActionType } from "../../store";
import { ClipLoader } from "react-spinners";

export default function AddReservationForm({ cancel }: { cancel: () => void }) {
  const [hostel, setHostel] = useState<string>("basil a oli boys hostel");
  const [isSelected, setSelectedStatus] = useState(false);
  const [floor, setFloor] = useState("ground floor");
  const [bedSpace, setBedSpace] = useState("a");
  const [room_name, setRoomName] = useState("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFloor((event.target as HTMLInputElement).value);
  };
  const [rooms, setRooms] = useState<
    {
      floor: string;
      rooms: { name: string; bed_space: BedSpaceType[] }[];
    }[]
  >([]);
  const handleNext = async () => {
    if (isLoading) return;
    setLoading(true);
    await axios
      .get(`${server_url}/reservation/available?hostel_name=${hostel}`)
      .then(({ data: { reservations } }) => {
        setRooms(reservations);
        setSelectedStatus(true);
      })
      .catch((error) => {
        console.log({ error });
        toast.error(error?.response?.data?.message ?? "Network error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (isLoading) return;
    setLoading(true);
    let token = localStorage.getItem("token");
    await axios
      .post(
        `${server_url}/reservation/reserve`,
        {
          hostel_name: hostel,
          floor,
          room_name,
          bed_space: bedSpace,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data: { reservation } }) => {
        dispatch({
          type: StoreActionType.addReservationDetails,
          payload: reservation,
        });
        setSelectedStatus(false);
        cancel();
      })
      .catch((error) => {
        console.log({ error });
        toast.error(error?.response?.data?.message ?? "Network error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <div className="addReservationForm">
        <form>
          <div className="form_header">
            <h4>Select Hostel</h4>
          </div>
          {!isSelected ? (
            <motion.div
              className="form_body"
              initial={{
                x: 0,
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                x: "-100%",
                opacity: 1,
              }}
            >
              <div
                className={
                  hostel === "basil a oli boys hostel"
                    ? "hostel active"
                    : "hostel"
                }
                onClick={() => {
                  setHostel("basil a oli boys hostel");
                }}
              >
                <span
                  className={"hostel_image"}
                  style={{
                    backgroundImage: "url(/assets/images/hostel3.jpeg)",
                  }}
                ></span>
                <span className="txt">Basil A Oli boys hostel</span>
              </div>
              <div
                className={
                  hostel === "hostel e boys hostel" ? "hostel active" : "hostel"
                }
                onClick={() => {
                  setHostel("hostel e boys hostel");
                }}
              >
                <span
                  className={"hostel_image"}
                  style={{
                    backgroundImage: "url(/assets/images/hostel2.jpeg)",
                  }}
                ></span>
                <span className="txt">Hostel E boys hostel</span>
              </div>
              <div
                className={
                  hostel === "prof dora A. girl's hostel"
                    ? "hostel active"
                    : "hostel"
                }
                onClick={() => {
                  setHostel("prof dora A. girl's hostel");
                }}
              >
                <span
                  className={"hostel_image"}
                  style={{
                    backgroundImage: "url(/assets/images/hostel1.jpeg)",
                  }}
                ></span>
                <span className="txt">Prof Dora A. Girl's Hostel</span>
              </div>
              <div
                className={
                  hostel === "stella okoli girls hostel"
                    ? "hostel active"
                    : "hostel"
                }
                onClick={() => {
                  setHostel("stella okoli girls hostel");
                }}
              >
                <span
                  className={"hostel_image"}
                  style={{
                    backgroundImage: "url(/assets/images/hostel4.jpeg)",
                  }}
                ></span>
                <span className="txt">Stella Okoli Girls hostel</span>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                className="form_body"
                initial={{
                  x: 0,
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  x: "-100%",
                  opacity: 1,
                }}
              >
                <FormControl component="fieldset" className="inputBox" required>
                  <FormLabel component="legend">Hostel Floor</FormLabel>
                  <RadioGroup
                    aria-label="hostel_floor"
                    name="Hostel_Floor"
                    value={floor}
                    onChange={handleChange}
                  >
                    {rooms.map((room) => {
                      return (
                        <FormControlLabel
                          value={room.floor}
                          control={<Radio />}
                          label={room.floor}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <div className="inputBox">
                  <label htmlFor="select">Select Room</label>
                  <Select
                    required
                    value={room_name}
                    onChange={(e) => {
                      setRoomName(e.target.value as string);
                      console.log();
                    }}
                  >
                    {find(rooms, { floor }) === null ||
                    find(rooms, { floor }) === undefined ? (
                      <></>
                    ) : (
                      find(rooms, { floor })?.rooms.map((_room) => {
                        return (
                          <MenuItem value={_room.name}>{_room.name}</MenuItem>
                        );
                      })
                    )}
                  </Select>
                </div>
                <FormControl component="fieldset" className="inputBox">
                  <FormLabel component="legend">Select Bed space</FormLabel>
                  <RadioGroup
                    aria-label="bedspace"
                    name="bedspace"
                    value={bedSpace}
                    onChange={(e) => {
                      setBedSpace(e.target.value);
                    }}
                  >
                    {find(
                      find(rooms, {
                        floor,
                      })?.rooms,
                      { name: room_name }
                    )?.bed_space.map((space) => {
                      return (
                        <FormControlLabel
                          value={space}
                          control={<Radio />}
                          label={
                            space === BedSpaceType.secA
                              ? "A"
                              : space === BedSpaceType.secB
                              ? "B"
                              : space === BedSpaceType.secC
                              ? "C"
                              : space === BedSpaceType.secD
                              ? "D"
                              : "D"
                          }
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </motion.div>
            </>
          )}
          <div className="action">
            <Button
              className="btn"
              onClick={() => {
                if (isSelected) {
                  setSelectedStatus(false);
                } else {
                  cancel();
                }
              }}
            >
              {!isSelected ? "cancel" : "previous"}
            </Button>
            <Button
              className="btn"
              onClick={() => {
                if (!isSelected) {
                  handleNext();
                } else {
                  handleSubmit();
                }
              }}
            >
              {isSelected ? "Reserve" : "Next"}
              {isLoading && <ClipLoader size={30} color="#f45e14" />}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
