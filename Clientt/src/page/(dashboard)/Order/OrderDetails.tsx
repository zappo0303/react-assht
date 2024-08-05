import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useQuery } from "react-query";
import { formatCurrencyVND } from "../../../services/VND/Vnd";
export interface OrderItem {
    name: string;
    price: number;
    quantity: number;
  }
const OrderDetail = () => {
  const { userId, orderId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["order", userId, orderId],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/api/v1/orders/${userId}/${orderId}`);
      return data;
    },
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error</Typography>;

  return (
    <>
      <Box sx={{ padding: 3 }}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2">Stt</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">Tên sản phẩm</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">Price</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">Quantity</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.items?.map((item : OrderItem, index : number) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{formatCurrencyVND(item.price)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <ToastContainer />
      </Box>
    </>
  );
};

export default OrderDetail;
