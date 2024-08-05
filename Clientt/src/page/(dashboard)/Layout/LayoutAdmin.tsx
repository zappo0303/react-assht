import { Outlet } from "react-router-dom";
import AdminMenuList from "../Sidebar";
import { Box, Grid } from "@mui/material";
import HeaderAdmin from "../HeaderAdmin";

const LayoutAdmin = () => {
  return (
    <>
     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <HeaderAdmin />
      <Grid container sx={{ flex: 1 }}>
        <Grid item xs={2} sx={{ bgcolor: 'black',color: "white", borderRight: '1px solid #ddd' }}>
          <AdminMenuList />
        </Grid>
        <Grid item xs={10} sx={{ padding: 2 }}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default LayoutAdmin;
