import ActiveLink from "../util/activeLinkMarker";
import { ReactElement } from "react";
import {
  Dashboard,
  PermIdentityTwoTone,
  HotelRounded,
  ChatTwoTone,
} from "@material-ui/icons";
import { ExitOutline, SettingsOutline } from "react-ionicons";
import { useRouter } from "next/router";

export default function SideBar() {
  const { push } = useRouter();
  return (
    <>
      <nav className="SideBar">
        <span className="header_logo" />
        <div className="account_details">
          <span className="avatar" />
          <h4 className="user_name">John Deo</h4>
          <p className="user_level">student</p>
        </div>
        <div className="nav_links">
          {routes.map((route, index) => {
            return (
              <ActiveLink
                href={route.link}
                activeClassName="active"
                key={index}
              >
                <a
                  className="nav_link"
                  onClick={async (e) => {
                    if (route.name === "Sign out") {
                      e.preventDefault();
                      await localStorage.removeItem("token");
                      push("/auth/login");
                    }
                  }}
                >
                  {route.icon()}
                  {route.name}
                </a>
              </ActiveLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}

const routes: {
  name: string;
  link: string;
  icon: () => ReactElement;
}[] = [
  {
    name: "Dashboard",
    link: "/panel/dashboard",
    icon: () => <Dashboard />,
  },
  {
    name: "My Profile",
    link: "/panel/profile",
    icon: () => <PermIdentityTwoTone />,
  },
  {
    name: "Reservation",
    link: "/panel/reservation",
    icon: () => <HotelRounded />,
  },
  {
    name: "Contact",
    link: "/panel/contact",
    icon: () => <ChatTwoTone />,
  },
  {
    name: "Settings",
    link: "/panel/setting",
    icon: () => <SettingsOutline />,
  },
  {
    name: "Sign out",
    link: "/auth/login",
    icon: () => <ExitOutline />,
  },
];
