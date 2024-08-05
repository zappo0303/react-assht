// src/pages/ProductsLiked.tsx
import { Box, Typography, CircularProgress, Grid, Paper, Container } from "@mui/material";
import NotFound from "../NotFound/NotFound";
import useProductsQuery from "../../../../hook/UseProductsQuerry";
import { formatCurrencyVND } from "../../../../services/VND/Vnd";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

interface Product {
  _id: string;
  img: string;
  name: string;
  price: number;
  discount: number;
  featured: boolean;
}

const ProductsLiked = () => {
  const { data, isLoading, error } = useProductsQuery();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
        <Typography variant="h6">Có lỗi xảy ra khi lấy dữ liệu sản phẩm.</Typography>
      </Box>
    );
  }

  if (!data || !data.length) {
    return <NotFound />;
  }

  const featuredProducts: Product[] = data.filter((product: Product) => product.featured);

  if (!featuredProducts.length) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">Không có sản phẩm yêu thích nào.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" fontFamily="Poppins" fontWeight={400} my={4}>
        Sản phẩm yêu thích
      </Typography>
      <Grid container spacing={3}>
        {featuredProducts.map((product: Product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Paper
              sx={{
                backgroundColor: "#f2f2f2",
                padding: "20px",
                position: "relative",
                borderRadius: 5,
                transition: "background-color 0.3s, color 0.3s",
                "&:hover": {
                  backgroundColor: "#000",
                  color: "#fff",
                  "& .MuiTypography-root": {
                    color: "#fff",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "#fff",
                  },
                  "& a": {
                    color: "#fff",
                  },
                },
              }}
              elevation={0}
            >
              <Box
                display="flex"
                alignItems="center"
                position="absolute"
                top={10}
                left={10}
                sx={{ borderRadius: 3 }}
                bgcolor="#f0f0f0"
                p={0.5}
              >
                <StarIcon fontSize="small" style={{ color: "#FFD700" }} />
                <Typography
                  variant="body2"
                  fontWeight={600}
                  paddingRight={0.8}
                  ml={0.5}
                >
                  4.5
                </Typography>
              </Box>
              <Box py={3} borderRadius={4} bgcolor={"white"}>
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.img}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "auto",
                      transform: "rotate(-35deg)",
                    }}
                  />
                </Link>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
              >
                <Typography variant="h6" fontWeight={600}>
                  <Link
                    to={`/product/${product._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {product.name}
                  </Link>
                </Typography>
                <Box>
                  <Link
                    style={{
                      color: "black",
                      textDecoration: "none",
                      fontWeight: 600,
                      backgroundColor: "white",
                      padding: "8px 16px",
                      borderRadius: 5,
                      border: "1px solid #ccc",
                    }}
                    to={`/product/${product._id}`}
                  >
                    View
                  </Link>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={1}
              >
                <Typography variant="body2" color={"#525252"} sx={{ textDecoration: 'line-through' }} fontWeight={600}>
                  {formatCurrencyVND(product.price)}
                </Typography>
                <Typography variant="h6" color={"red"} fontWeight={600}>
                  {product.discount > 0
                    ? formatCurrencyVND(product.price * (1 - product.discount / 100))
                    : formatCurrencyVND(product.price)}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsLiked;
