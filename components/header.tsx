import { IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { NotificationsOutline, MenuOutline } from "react-ionicons";
import { useDispatch } from "react-redux";
import { StoreActionType } from "../store";

export default function Header() {
  const { pathname } = useRouter();
  const dispatch = useDispatch();
  return (
    <header>
      <IconButton
        className="icon_btn"
        onClick={() => {
          dispatch({ type: StoreActionType.toggleNavBar });
        }}
      >
        <MenuOutline color={"#00000"} height="20px" width="20px" />
      </IconButton>
      <h3 className="title">{pathname.split("/")[2].toUpperCase()}</h3>
      <IconButton className="icon_btn">
        <NotificationsOutline color={"#00000"} height="20px" width="20px" />
      </IconButton>
    </header>
  );
}
