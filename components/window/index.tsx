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

export default function AddReservationForm({ cancel }: { cancel: () => void }) {
  const [hostel, setHostel] = useState<string>("basil a oli boys hostel");
  const [isSelected, setSelectedStatus] = useState(false);
  const [floor, setFloor] = useState("ground floor");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFloor((event.target as HTMLInputElement).value);
  };

  return (
    <>
      {" "}
      <div className="addReservationForm">
        {" "}
        <form>
          {" "}
          <div className="form_header">
            {" "}
            <h4>Select Hostel</h4>{" "}
          </div>{" "}
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
              {" "}
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
                {" "}
                <span
                  className={"hostel_image"}
                  style={{
                    backgroundImage: "url(/assets/images/hostel1.jpeg)",
                  }}
                ></span>{" "}
                <span className="txt">Basil A Oli boys hostel</span>{" "}
              </div>{" "}
              <div
                className={
                  hostel === "hostel e boys hostel" ? "hostel active" : "hostel"
                }
                onClick={() => {
                  setHostel("hostel e boys hostel");
                }}
              >
                {" "}
                <span
                  className={"hostel_image"}
                  style={{
                    backgroundImage: "url(/assets/images/hostel2.jpeg)",
                  }}
                ></span>{" "}
                <span className="txt">Hostel E boys hostel</span>{" "}
              </div>{" "}
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
                {" "}
                <span
                  className={"hostel_image"}
                  style={{
                    backgroundImage: "url(/assets/images/hostel3.jpeg)",
                  }}
                ></span>{" "}
                <span className="txt">Prof Dora A. Girl's Hostel</span>
              </div>{" "}
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
                {" "}
                <span
                  className={"hostel_image"}
                  style={{
                    backgroundImage: "url(/assets/images/hostel4.jpeg)",
                  }}
                ></span>{" "}
                <span className="txt">Stella Okoli Girls hostel</span>{" "}
              </div>{" "}
            </motion.div>
          ) : (
            <>
              {" "}
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
                {" "}
                <FormControl component="fieldset">
                  {" "}
                  <FormLabel component="legend">Hostel Floor</FormLabel>{" "}
                  <RadioGroup
                    aria-label="hostel_floor"
                    name="Hostel_Floor"
                    value={floor}
                    onChange={handleChange}
                  >
                    {" "}
                    <FormControlLabel
                      value="ground floor"
                      control={<Radio />}
                      label="Ground Floor"
                    />{" "}
                    <FormControlLabel
                      value="first floor"
                      control={<Radio />}
                      label="First Floor"
                    />{" "}
                    <FormControlLabel
                      value="second floor"
                      control={<Radio />}
                      label="Second Floor"
                    />{" "}
                  </RadioGroup>{" "}
                </FormControl>{" "}
                <div className="inputBox">
                  {" "}
                  <label htmlFor="select">Select Room</label>{" "}
                  <Select>
                    {" "}
                    <MenuItem></MenuItem>{" "}
                  </Select>{" "}
                </div>{" "}
                <FormControl component="fieldset">
                  {" "}
                  <FormLabel component="legend">Select Bedspace</FormLabel>{" "}
                  <RadioGroup
                    aria-label="bedspace"
                    name="bedspace"
                    value={floor}
                    onChange={handleChange}
                  >
                    {" "}
                    <FormControlLabel
                      value="a"
                      control={<Radio />}
                      label="A"
                    />{" "}
                    <FormControlLabel value="b" control={<Radio />} label="B" />{" "}
                    <FormControlLabel value="c" control={<Radio />} label="C" />{" "}
                    <FormControlLabel value="d" control={<Radio />} label="D" />{" "}
                  </RadioGroup>{" "}
                </FormControl>{" "}
              </motion.div>{" "}
            </>
          )}
          <div className="action">
            {" "}
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
              {" "}
              {!isSelected ? "cancel" : "previous"}
            </Button>{" "}
            <Button
              className="btn"
              onClick={() => {
                setSelectedStatus(true);
              }}
            >
              {" "}
              {isSelected ? "Reserve" : "Next"}
            </Button>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </>
  );
}
