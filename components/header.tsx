import { IconButton } from "@material-ui/core";
import { NotificationsOutline } from "react-ionicons";

export default function Header() {
  return (
    <header>
      <h3 className="title">Dashboard</h3>
      <IconButton className="icon_btn">
        <NotificationsOutline color={"#00000"} height="20px" width="20px" />
      </IconButton>
    </header>
  );
}
