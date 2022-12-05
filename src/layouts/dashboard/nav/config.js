// component
import { DashboardOutlined } from '@mui/icons-material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <DashboardOutlined />,
  },
  {
    title: 'all orders',
    path: '/dashboard/all-orders',
    icon: <ShoppingCartOutlinedIcon />,
  },
  {
    title: 'new order',
    path: '/dashboard/new-order',
    icon: <AddShoppingCartOutlinedIcon />,
  }
];

export default navConfig;
