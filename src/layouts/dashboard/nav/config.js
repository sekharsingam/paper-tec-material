// component
import {
  DashboardOutlined,
  LocalShipping,
  PeopleAltOutlined,
} from "@mui/icons-material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useEffect } from "react";
import { ROLE_ADMIN } from "src/utils/constants";
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

function navConfig() {
  const user = JSON.parse(localStorage.user || "{}");
  const dashboardNavItem = {
    title: "dashboard",
    path: "/dashboard/app",
    icon: <DashboardOutlined />,
  };
  const allOrdersNavItem = {
    title: "all orders",
    path: "/dashboard/all-orders",
    icon: <ShoppingCartOutlinedIcon />,
  };
  const requestedOrdersNavItem = {
    title: "requested orders",
    path: "/dashboard/requested-orders",
    icon: <ShoppingCartOutlinedIcon />,
  };
  const newOrderRequestNavItem = {
    title: "new order request",
    path: "/dashboard/new-order",
    icon: <AddShoppingCartOutlinedIcon />,
  };
  const allCustomersNavItem = {
    title: "all customers",
    path: "/dashboard/all-customers",
    icon: <PeopleAltOutlined />,
  };
  const deliveriesNavItem = {
    title: "deliveries",
    path: "/dashboard/deliveries",
    icon: <LocalShipping />,
  };

  let routeConfig = [];
  // All Customers is available only to ADMINS
  if (user.role === ROLE_ADMIN) {
    routeConfig.push(
      dashboardNavItem,
      allOrdersNavItem,
      requestedOrdersNavItem,
      newOrderRequestNavItem,
      allCustomersNavItem,
      deliveriesNavItem
    );
  } else {
    routeConfig.push(
      dashboardNavItem,
      allOrdersNavItem,
      newOrderRequestNavItem,
      deliveriesNavItem
    );
  }
  return routeConfig;
}

export default navConfig;
