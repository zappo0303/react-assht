import {
    Container,
    Grid,
    Typography,
    Link,
    Box,
    IconButton,
  } from "@mui/material";
  import { Facebook, Twitter, Instagram } from "@mui/icons-material";
  
  const FooterAdmin = () => {
    return (
      <Box sx={{ bgcolor: "black", color: "white", py: 6 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" mb={3} gutterBottom>
                Liên hệ
              </Typography>
              <Typography mb={1}>
                Địa chỉ: 123 Đường ABC, Quận 1, TP. Hồ Chí Minh
              </Typography>
              <Typography mb={1}>Điện thoại: (123) 456-7890</Typography>
              <Typography mb={1}>Email: info@yourstore.com</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" mb={3} gutterBottom>
                Dịch vụ khách hàng
              </Typography>
              <Box mb={1}>
                <Link href="#" color="inherit" underline="hover">
                  Trợ giúp
                </Link>
              </Box>
              <Box mb={1}>
                <Link href="#" color="inherit" underline="hover">
                  Chính sách bảo hành
                </Link>
              </Box>
              <Box mb={1}>
                <Link href="#" color="inherit" underline="hover">
                  Chính sách đổi trả
                </Link>
              </Box>
              <Box mb={1}>
                <Link href="#" color="inherit" underline="hover">
                  Liên hệ
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" mb={3} gutterBottom>
                Thông tin
              </Typography>
              <Box mb={1}>
                <Link href="#" color="inherit" underline="hover">
                  Về chúng tôi
                </Link>
              </Box>
              <Box mb={1}>
                <Link href="#" color="inherit" underline="hover">
                  Điều khoản sử dụng
                </Link>
              </Box>
              <Box mb={1}>
                <Link href="#" color="inherit" underline="hover">
                  Chính sách bảo mật
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" mb={3} gutterBottom>
                Theo dõi chúng tôi
              </Typography>
              <Box display="flex" flexDirection="row" gap={1}>
                <IconButton href="#" color="inherit">
                  <Facebook />
                </IconButton>
                <IconButton href="#" color="inherit">
                  <Twitter />
                </IconButton>
                <IconButton href="#" color="inherit">
                  <Instagram />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" mt={4}>
            <Typography>&copy; 2024 Your Store. All rights reserved.</Typography>
          </Box>
        </Container>
      </Box>
    );
  };
  
  
export default FooterAdmin