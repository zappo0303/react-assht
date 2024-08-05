import { Box } from "@mui/material";
import { styled } from "@mui/system";

const ImgContainer = styled(Box)({
  width: 100, 
  height: 100, 
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 32,
});

interface ImgProductDetailProps {
  product: {
    imgCategory: string[];
    name: string;
  };
}

const ImgProductDetail = ({ product }: ImgProductDetailProps) => {
  return (
      <Box>
          {product.imgCategory.map((imgUrl, index) => (
          <ImgContainer key={index}>
            <img src={imgUrl} alt={product.name} style={{ maxWidth: "100%", height: "auto" }} />
          </ImgContainer>
        ))}
      </Box>
  );
};

export default ImgProductDetail;
