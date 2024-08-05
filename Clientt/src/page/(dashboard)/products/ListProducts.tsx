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
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";
import { Link } from "react-router-dom";
import useProductsQuery from "../../../hook/UseProductsQuerry";
import useProductMutation from "../../../hook/UseProductMutation";
import UseCategory from "../../../hook/UseCategory";
import { formatCurrencyVND } from "../../../services/VND/Vnd";
import NotFound from "../../../page/website/Home/NotFound/NotFound";
import { IdProducts } from "@/interfaces/Products";
import React from "react";

interface Category {
  _id: string;
  name: string;
}

const AdminProductList = () => {
  // Hook calls at the top level
  const { data, isLoading } = useProductsQuery();
  const { mutate } = useProductMutation({ action: "DELETE" });
  const { data: categories, isLoading: loadingCategory } = UseCategory();

  // State for pagination and sorting
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

  // Handle loading state
  if (isLoading || loadingCategory) return <CircularProgress />;
  if (!data) return <NotFound />;

  const handleDelete = async (id: number | string) => {
    await mutate({ _id: id } as IdProducts);
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

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  // Calculate paginated and sorted data
  const sortedData = [...data].sort((a, b) => {
    const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price;
    const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price;

    if (sortOrder === 'asc') {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });

  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Danh Sách Sản Phẩm
        </Typography>
        <Box>
          <Tooltip title="Sắp xếp theo giá tăng dần" arrow>
            <Button onClick={() => handleSort('asc')} variant="contained" color="primary" startIcon={<SortIcon />}>
              Giá tăng dần
            </Button>
          </Tooltip>
          <Tooltip title="Sắp xếp theo giá giảm dần" sx={{mx: 2}} arrow>
            <Button onClick={() => handleSort('desc')} variant="contained" color="secondary" startIcon={<SortIcon />}>
              Giá giảm dần
            </Button>
          </Tooltip>
        </Box>
        <Tooltip title="Thêm sản phẩm" arrow>
          <Link to={`/admin/productAdd`} style={{ textDecoration: 'none' }}>
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
              <TableCell>Tên</TableCell>
              <TableCell>Ảnh</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Giảm giá</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((product: IdProducts) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <img
                    src={product.img}
                    alt={product.name}
                    style={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell>
                  {product.discount > 0
                    ? formatCurrencyVND(
                        product.price * (1 - product.discount / 100)
                      )
                    : formatCurrencyVND(product.price)}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      width: "350px",
                      height: "50px",
                      overflowY: "auto",
                      overflowX: "hidden",
                      fontWeight: 500,
                      padding: "4px",
                    }}
                  >
                    {product.description}
                  </Box>
                </TableCell>
                <TableCell>
                  {product.discount > 0 ? `${product.discount}%` : "Không có"}
                </TableCell>
                <TableCell>
                  {categories?.find(
                    (cat: Category) => cat._id === product.category
                  )?.name || "Không có"}
                </TableCell>
                <TableCell>
                  <Link to={`/admin/product/edit/${product._id}`}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    onClick={() => product._id && handleDelete(product._id)}
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

export default AdminProductList;
