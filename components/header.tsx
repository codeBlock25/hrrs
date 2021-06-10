import { IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { NotificationsOutline } from "react-ionicons";

export default function Header() {
  const { pathname } = useRouter();
  return (
    <header>
      <h3 className="title">{pathname.split("/")[2].toUpperCase()}</h3>
      <IconButton className="icon_btn">
        <NotificationsOutline color={"#00000"} height="20px" width="20px" />
      </IconButton>
    </header>
  );
}
