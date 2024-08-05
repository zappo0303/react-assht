import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from 'react-query';

type Order = {
  _id: string;
  orderNumber: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: string; // Ngày tạo đơn hàng
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
};

const OrderPage = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?._id;
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Order[]>({
    queryKey: ["order"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/api/v1/orders`);
      return data;
    },
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      await axios.patch(`http://localhost:8080/api/v1/orders/${orderId}/status`, { status });
      queryClient.invalidateQueries(["order"]);
    },
    onSuccess: () => {
      toast.success("Order status updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update order status");
    }
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus.mutate({ orderId, status: newStatus });
  };

  const getDisabledStatuses = (currentStatus: string) => {
    const statusOrder = ["pending", "confirmed", "shipped", "delivered"];
    const index = statusOrder.indexOf(currentStatus);
    return statusOrder.slice(0, index + 1);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error</Typography>;
  if (!data || data.length === 0) {
    return (
      <Box sx={{ height: 200, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color="error">
          Không có sản phẩm nào trong giỏ hàng
        </Typography>
      </Box>
    );
  }

  // Sắp xếp đơn hàng theo ngày tạo (createdAt) giảm dần
  const sortedData = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <>
      <Box sx={{ padding: 3 }}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Orders List
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Stt</TableCell>
                  <TableCell>Id Order</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Chức năng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(sortedData) && sortedData.map((order, index) => (
                  <TableRow key={order._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>{order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</TableCell>
                    <TableCell>
                      <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          label="Status"
                          disabled={order.status === "delivered"}
                        >
                          {["pending", "confirmed", "shipped", "delivered"].map((status) => (
                            <MenuItem
                              key={status}
                              value={status}
                              disabled={getDisabledStatuses(order.status).includes(status)}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          component={Link}
                          to={`/admin/orders/${userId}/${order._id}`}
                        >
                          Detail order
                        </Button>
                      </Box>
                    </TableCell>
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

export default OrderPage;
