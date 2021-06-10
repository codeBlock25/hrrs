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
import { useDispatch, useSelector } from "react-redux";
import { AppReducerType, StoreActionType } from "../store";

export default function SideBar() {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { isNavOpen, name } = useSelector<
    AppReducerType,
    { isNavOpen: boolean; name: string }
  >((state) => {
    return {
      isNavOpen: state.event.isNavOpen,
      name: `${state.record?.details?.first_name ?? "No"} ${
        state.record?.details?.last_name ?? "Name"
      }`,
    };
  });
  return (
    <>
      <div
        className={isNavOpen ? "cover active" : "cover"}
        onClick={() => {
          dispatch({ type: StoreActionType.toggleNavBar });
        }}
      ></div>
      <nav className={isNavOpen ? "SideBar active" : "SideBar"}>
        <span className="header_logo" />
        <div className="account_details">
          <span className="avatar" />
          <h4 className="user_name" style={{ textTransform: "capitalize" }}>
            {name}
          </h4>
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
