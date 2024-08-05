import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Link, useParams } from "react-router-dom";
import { IdProducts } from "@/interfaces/Products";
import { formatCurrencyVND } from "../../../../services/VND/Vnd";
import NotFound from "../NotFound/NotFound";
import UseCategory from "../../../../hook/UseCategory";
import Category from "./Category";
const CategoryList = () => {
  const { id } = useParams();
  const { data, isLoading } = UseCategory(id);
  if (!data) return <NotFound />;
  if (isLoading)
    return (
      <>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </>
    );
  return (
    <>
    <Category/>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {data &&
            data.product.map((product: IdProducts) => (
              <Grid item xs={12} sm={6} md={3} key={product._id}>
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
                    top={40}
                    left={30}
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
                      style={{ color: "#000" }}
                    >
                      4.5
                    </Typography>
                  </Box>
                  <Box py={3} borderRadius={4} bgcolor={"white"}>
                    <Link to={`product/${product._id}`}>
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
                    mt={4}
                  >
                    <Typography variant="h6" fontWeight={600}>
                      <Link
                        to={`product/${product._id}`}
                        style={{ textDecoration: "none" }}
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
                          padding: 10,
                          borderRadius: 10,
                        }}
                        to={`product/${product._id}`}
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
                    <Typography variant="h6" color={"#525252"} fontWeight={600}>
                      colorful
                    </Typography>
                    <Typography variant="h6" color={"red"} fontWeight={600}>
                      {formatCurrencyVND(product.price)}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default CategoryList;
