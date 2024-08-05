import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

const AdminMenuList = () => {
  return (
    <List sx={{px:3}}>
      <ListItem button component={Link} to="/admin/dashboard">
        <ListItemIcon>
          <HomeIcon sx={{color: "white"}} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button component={Link} to="/admin/products">
        <ListItemIcon>
          <ShoppingCartIcon  sx={{color: "white"}}/>
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItem>

      <ListItem button component={Link} to="/admin/category">
        <ListItemIcon>
          <InboxIcon sx={{color: "white"}} />
        </ListItemIcon>
        <ListItemText primary="category" />
      </ListItem>

      <ListItem button component={Link} to="/admin/order">
        <ListItemIcon>
          <PeopleIcon sx={{color: "white"}} />
        </ListItemIcon>
        <ListItemText primary="order" />
      </ListItem>

      <ListItem button component={Link} to="/admin/messages">
        <ListItemIcon>
          <DraftsIcon  sx={{color: "white"}}/>
        </ListItemIcon>
        <ListItemText primary="Messages" />
      </ListItem>
    </List>
  );
};

export default AdminMenuList;
