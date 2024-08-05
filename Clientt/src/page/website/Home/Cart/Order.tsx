import React, { FormEvent, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  IconButton,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { formatCurrencyVND } from "../../../../services/VND/Vnd";
import useCartsQuery from "../../../../hook/useCartQuerry";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../../../config/Axios";
import { useNavigate } from "react-router-dom";

interface Error {
  message: string;
}

export interface CartItem {
  _id: string;
  img: string;
  name: string;
  quantity?: number;
  price: number;
}

const Checkout: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
  const { data, error } = useCartsQuery(userId);

  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");

  const incrementQuantity = useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await axiosInstance.post(`/api/v1/carts/increase`, {
        userId,
        productId,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["CART_ORDER", userId]);
    },
    onError: (error: Error) => {
      toast.error(`Lỗi: ${error.message}`);
    },
  });

  const decrementQuantity = useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await axiosInstance.post(`/api/v1/carts/decrease`, {
        userId,
        productId,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["CART_ORDER", userId]);
    },
    onError: (error: Error) => {
      toast.error(`Lỗi: ${error.message}`);
    },
  });

  const removeQuantity = useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await axiosInstance.post(`/api/v1/carts/remove`, {
        userId,
        productId,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["CART_ORDER", userId]);
      toast.success("Xóa sản phẩm thành công");
    },
    onError: (error: Error) => {
      toast.error(`Lỗi: ${error.message}`);
    },
  });

  const clearCart = useMutation({
    mutationFn: async () => {
      await axiosInstance.post('/api/v1/carts/clear', { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["CART_ORDER", userId]);
    },
    onError: (error: Error) => {
      toast.error(`Lỗi: ${error.message}`);
    },
  });

  const createOrder = useMutation({
    mutationFn: async () => {
      const orderData = {
        userId,
        items: data?.products.map((item: CartItem) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
        })),
        totalPrice: calculateTotal(),
        customerInfo: {
          name: customerName,
          phone: phoneNumber,
          email: email,
          address: address,
        },
      };
      const response = await axiosInstance.post('/api/v1/orders', orderData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Đơn hàng đã được tạo thành công!");
      clearCart.mutate();
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(`Lỗi: ${error.message}`);
    },
  });

  if (!userId) {
    toast.error("Bạn chưa đăng nhập !!");
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let valid = true;
    if (!customerName) {
      setNameError("Họ và tên không được để trống.");
      valid = false;
    } else {
      setNameError("");
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      setPhoneError("Số điện thoại không hợp lệ.");
      valid = false;
    } else {
      setPhoneError("");
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Email không hợp lệ.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!address) {
      setAddressError("Địa chỉ không được để trống.");
      valid = false;
    } else {
      setAddressError("");
    }

    if (!valid) {
      return;
    }

    await createOrder.mutate();
  };

  const calculateTotal = () => {
    return data?.products.reduce(
      (total: number, item: CartItem) => total + (item.price * (item.quantity || 1)),
      0
    );
  };

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">Lỗi: {(error as Error).message}</Typography>
      </Box>
    );
  }

  if (!data || !data.products.length) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Typography color="error">Không có sản phẩm trong giỏ hàng.</Typography>
      </Box>
    );
  }

  return (
    <section style={{ backgroundColor: "white", paddingTop: 50 }}>
      <Container maxWidth="lg">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom>
                <a href="#!" style={{ color: "#333", textDecoration: "none" }}>
                  <i
                    className="fas fa-long-arrow-alt-left"
                    style={{ marginRight: 8 }}
                  ></i>
                  Tiếp tục mua sắm
                </a>
              </Typography>
              <Divider />
              <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                  Giỏ hàng
                </Typography>
                {data.products.map((item: CartItem) => (
                  <Card key={item._id} style={{ marginBottom: 20 }}>
                    <CardContent>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                          <img
                            src={item.img}
                            alt="Product"
                            style={{ width: 80 }}
                          />
                        </Grid>
                        <Grid item xs>
                          <Typography variant="subtitle1">
                            {item.name}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Box display="flex" alignItems="center">
                            <IconButton
                              color="inherit"
                              onClick={() => decrementQuantity.mutate(item._id)}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <TextField
                              type="number"
                              variant="outlined"
                              size="small"
                              value={item.quantity}
                              inputProps={{
                                min: 1,
                                style: { textAlign: "center" },
                              }}
                              style={{ width: 60, margin: "0 10px" }}
                            />
                            <IconButton
                              color="inherit"
                              onClick={() => incrementQuantity.mutate(item._id)}
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Typography width={100} variant="body1">
                            {formatCurrencyVND(item.price)}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <IconButton
                            color="inherit"
                            onClick={() => removeQuantity.mutate(item._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                elevation={3}
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  padding: 20,
                  marginTop: "30%",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Chi tiết thanh toán
                </Typography>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  variant="outlined"
                  margin="normal"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  error={!!nameError}
                  helperText={nameError}
                  InputProps={{ sx: { bgcolor: "white" } }}
                />
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  variant="outlined"
                  margin="normal"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  error={!!phoneError}
                  helperText={phoneError}
                  InputProps={{ sx: { bgcolor: "white" } }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                  InputProps={{ sx: { bgcolor: "white" } }}
                />
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  variant="outlined"
                  margin="normal"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  error={!!addressError}
                  helperText={addressError}
                  InputProps={{ sx: { bgcolor: "white" } }}
                />
                <Box mt={2} mb={2}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="body1">
                      {/* ${subtotal.toFixed(2)} */}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="body1">
                      {/* ${shipping.toFixed(2)} */}
                    </Typography>
                  </Grid>
                  <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6">Tổng cộng</Typography>
                    <Typography variant="h6">
                      {formatCurrencyVND(calculateTotal())}
                    </Typography>
                  </Grid>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  fullWidth
                  disabled={createOrder.isLoading}
                >
                  {createOrder.isLoading ? "Đang xử lý..." : "Thanh toán"}
                </Button>
              </Card>
            </Grid>
          </Grid>
        </form>
      </Container>
    </section>
  );
};

export default Checkout;
