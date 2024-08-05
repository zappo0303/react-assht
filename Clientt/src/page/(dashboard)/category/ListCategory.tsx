import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    IconButton,
    CircularProgress,
    Tooltip,
    TablePagination,
  } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import AddIcon from "@mui/icons-material/Add";
  import { Link } from "react-router-dom";
  import useCategoriesQuery from "../../../hook/UseCategory"; 
  import useCategoryMutation from "../../../hook/UseCategoryMutation"; 
  import NotFound from "../../../page/website/Home/NotFound/NotFound";
  import React from "react";
  
  interface Category {
    _id: string;
    name: string;
  }
  
  const AdminCategoryList = () => {
    // Gọi hook ở cấp độ trên cùng
    const { data, isLoading } = useCategoriesQuery();
    const { mutate } = useCategoryMutation({ action: "DELETE" });
  
    // State cho phân trang
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);
  
    // Xử lý trạng thái tải
    if (isLoading) return <CircularProgress />;
    if (!data) return <NotFound />;
  
    const handleDelete = async (category: Category) => {
      await mutate(category); 
    };
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    // Tính toán dữ liệu phân trang
    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
    return (
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            Danh Sách Danh Mục
          </Typography>
          <Tooltip title="Thêm danh mục" arrow>
            <Link to={`/admin/category/add`} style={{ textDecoration: 'none' }}>
              <IconButton
                sx={{
                  background: 'linear-gradient(45deg, #6a1b9a 30%, #ab47bc 90%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #6a1b9a 40%, #ab47bc 100%)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  },
                  transition: 'background 0.3s, boxShadow 0.3s',
                }}
              >
                <AddIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên danh mục</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Chức năng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((category: Category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Link to={`/admin/category/edit/${category._id}`}>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      onClick={() => handleDelete(category)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[6, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    );
  };
  
  export default AdminCategoryList;
  