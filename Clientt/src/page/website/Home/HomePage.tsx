import { Container } from "@mui/material";
import Banner from "./Banner/Banner";
import ProductsList from "./products/ProductsList";
import CategoryList from "./Category/Category";
const HomePage = () => {
  return (
    <Container maxWidth="xl">
      <Banner />
      <CategoryList />
      <ProductsList />
    </Container>
  );
};

export default HomePage;
