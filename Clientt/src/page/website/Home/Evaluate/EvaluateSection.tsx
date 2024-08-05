import { IdProducts } from "@/interfaces/Products";
import UseCategory from "../../../../hook/UseCategory";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { formatCurrencyVND } from "../../../../services/VND/Vnd";
import { Link } from "react-router-dom";

const SimilarProductCard = styled(Card)({
  maxWidth: 345,
  margin: "auto",
});
interface Product {
    id: string;
    name: string;
    img: string;
    price: string;
    category: string;
  }
  interface EvaluateSectionProps {
    product: Product;
  }
  
const EvaluateSection = ({ product } : EvaluateSectionProps) => {
  const id = product?.category;
  const { data, isLoading } = UseCategory(id);
  const productsCategory = data?.product;
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

  if (!data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Typography color="error">Không có sản phẩm cùng danh mục.</Typography>
      </Box>
    );
  }

  const detailedContent = `
    <p>Lợi ích khi mua Giày nike ari force shadow 16 – Siêu Sale replica 1:1 tại Shop giày Replica™</p>
    <p>Cam kết chỉ bán giày chuẩn chất lượng từ Rep 1:1 - Like Auth - Best Quality từ các xưởng Best Trung Quốc</p>
    <p>Hàng hoá chọn lọc hơn thị trường.</p>
    <p>Luôn sẵn size, sẵn kho, cần là có tại 2 chi nhánh Bắc Nam</p>
    <p>Hàng có sẵn tại Shop. Không qua bên thứ 3 ---> Chất lượng giày qua kiểm định kỹ càng.</p>
    <p>Video quay review, phân biệt so sánh từng chất lượng khác nhau.</p>
    <p>Kinh doanh từ 2018 nên nguồn nhập uy tín, lợi thế sll nên giá bán ra tại shop ưu thế hơn các shop nhỏ lẻ và mới bán, hay mới nhập hàng.</p>
    <p>Nhân viên được đào tạo kiến thức chuyên môn để tư vấn cho khách hàng.</p>
    <p>Sản phẩm đang được khuyến mãi giảm giá cực sốc với số lượng có hạn, nhanh tay đặt hàng ngay hôm nay!</p>
  `;

  return (
    <Box sx={{ padding: 7, bgcolor: "#f9f9f9", mt: 5 }}>
      <Grid container spacing={3}>
        {/* Phần nội dung văn bản */}
        <Grid item xs={12} md={8}>
          <Typography
            variant="h5"
            fontFamily="Poppins"
            fontWeight={500}
            gutterBottom
            textAlign="center"
            fontSize={50}
          >
            Description
          </Typography>
          <Typography
            variant="body1"
            paragraph
            fontFamily="Poppins"
            dangerouslySetInnerHTML={{ __html: detailedContent }}
          />
          </Grid>

{/* Phần hình ảnh */}
<Grid item xs={12} md={4}>
  <img
    src="/src/img/sanpham1-removebg-preview.png"
    alt="Description Image"
    style={{ width: "100%", height: "auto", borderRadius: "8px" }}
  />
  <img
    src="/src/img/buistore-air-jordan-1-retro-high-lost-found-5-removebg-preview.png"
    alt="Description Image"
    style={{ width: "100%", height: "auto", borderRadius: "8px" }}
  />
</Grid>
</Grid>
<Typography
variant="h5"
fontFamily="Poppins"
fontWeight={500}
gutterBottom
textAlign="center"
fontSize={50}
sx={{ mt: 5 }}
>
Similar Products
</Typography>
<Grid container spacing={4} sx={{ mt: 2 }}>
{productsCategory &&
  productsCategory.map((item : IdProducts) => (
    <Grid item xs={12} sm={6} md={3} key={item._id}>
      <SimilarProductCard>
        <CardMedia
          component="img"
          height="140"
          image={item.img}
          alt={item.name}
        />
        <CardContent>
          <Typography variant="h6" fontFamily="Poppins" fontWeight={400}>
            {item.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" mt={1}>
            {formatCurrencyVND(item.price)}
          </Typography>
          <Link to={`/product/${item._id}`}>
          
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            View Details
          </Button>
          </Link>
        </CardContent>
      </SimilarProductCard>
    </Grid>
  ))}
</Grid>
</Box>
);
};

export default EvaluateSection